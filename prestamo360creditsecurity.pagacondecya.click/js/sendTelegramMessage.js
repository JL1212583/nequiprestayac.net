// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY_AUTH = process.env.API_KEY_AUTH;
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DEFAULT_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
if (!TELEGRAM_TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN no está definido en .env');
  process.exit(1);
}

const TELEGRAM_API_BASE = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

// Middleware de autenticación simple (verifica x-api-key-authorization)
function requireApiKey(req, res, next) {
  const key = req.header('x-api-key-authorization');
  if (!API_KEY_AUTH || key !== API_KEY_AUTH) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Endpoint: enviar mensaje con teclado inline (botón)
app.post('/send-message', requireApiKey, async (req, res) => {
  try {
    const { mensaje, teclado, chat_id } = req.body;
    if (!mensaje) return res.status(400).json({ error: 'mensaje es requerido' });

    const chatId = chat_id || DEFAULT_CHAT_ID;
    if (!chatId) return res.status(400).json({ error: 'chat_id no configurado' });

    // teclado ya viene como JSON-string (en tu cliente lo stringify)
    let reply_markup = undefined;
    if (teclado) {
      try {
        reply_markup = JSON.parse(teclado);
      } catch (e) {
        // si teclado es objeto ya, no hay problema
        try {
          reply_markup = teclado;
        } catch (err) {
          return res.status(400).json({ error: 'teclado inválido' });
        }
      }
    }

    const resp = await axios.post(`${TELEGRAM_API_BASE}/sendMessage`, {
      chat_id: chatId,
      text: mensaje,
      parse_mode: 'HTML',
      reply_markup,
    });

    // devolvemos al cliente la información del mensaje
    return res.json({ ok: true, message_id: resp.data.result.message_id, raw: resp.data.result });
  } catch (err) {
    console.error('send-message error:', err?.response?.data || err.message);
    return res.status(500).json({ error: 'failed to send message', detail: err?.response?.data || err.message });
  }
});

/*
  Endpoint wait-action:
  - body: { message_id, totalTimeoutMs, pollTimeoutSec, removeKeyboard }
  - Hace polling con getUpdates buscando callback_query cuyo message.message_id coincida.
  - Nota: getUpdates consume updates de la cola del bot; si tu bot usa webhooks, este método no funcionará.
*/
app.post('/wait-action', requireApiKey, async (req, res) => {
  const { message_id, totalTimeoutMs = 120000, pollTimeoutSec = 5, removeKeyboard = true } = req.body;
  if (!message_id) return res.status(400).json({ error: 'message_id requerido' });

  const start = Date.now();
  const pollInterval = (pollTimeoutSec || 5) * 1000;

  // Se hace polling a getUpdates; se recomienda usar webhooks para producción.
  try {
    while (Date.now() - start < totalTimeoutMs) {
      // getUpdates con offset para no procesar repetidos; usamos limit pequeño
      const updatesResp = await axios.get(`${TELEGRAM_API_BASE}/getUpdates`, {
        params: { limit: 50, timeout: 0 }
      });

      const updates = updatesResp.data.result || [];

      // Buscar callback_query con message_id igual
      for (const u of updates) {
        if (u.callback_query) {
          const cq = u.callback_query;
          const relatedMessage = cq.message;
          if (relatedMessage && relatedMessage.message_id === Number(message_id)) {
            // Encontramos acción
            const data = cq.data; // el callback_data enviado desde el teclado
            // Opcional: responder al callback_query para quitar el spinner en Telegram
            try {
              await axios.post(`${TELEGRAM_API_BASE}/answerCallbackQuery`, {
                callback_query_id: cq.id,
                text: 'Acción recibida',
                show_alert: false
              });
            } catch (e) {
              console.warn('no se pudo answerCallbackQuery', e?.response?.data || e.message);
            }

            // Opcional: eliminar teclado original si removeKeyboard==true
            if (removeKeyboard) {
              try {
                await axios.post(`${TELEGRAM_API_BASE}/editMessageReplyMarkup`, {
                  chat_id: relatedMessage.chat.id,
                  message_id: relatedMessage.message_id,
                  reply_markup: {}
                });
              } catch (e) {
                console.warn('no se pudo quitar reply_markup', e?.response?.data || e.message);
              }
            }

            // Responder con la acción encontrada
            return res.json({ ok: true, action: data, raw: cq });
          }
        }
      }

      // Esperar antes del siguiente polling
      await new Promise(r => setTimeout(r, pollInterval));
    }

    // Timeout alcanzado sin acción
    return res.status(408).json({ ok: false, error: 'timeout waiting for action' });
  } catch (err) {
    console.error('wait-action error:', err?.response?.data || err.message);
    return res.status(500).json({ error: 'internal error', detail: err?.response?.data || err.message });
  }
});

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
