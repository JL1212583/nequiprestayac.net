const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("❌ Error: No se encontró TELEGRAM_BOT_TOKEN en variables de entorno.");
  process.exit(1);
}

// Inicializa el bot en modo polling
const bot = new TelegramBot(token, { polling: true });

// Comando /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 ¡Hola! Soy tu bot de Telegram y tu web también está activa 🚀");
});

// Responde a cualquier mensaje (evita repetir /start)
bot.on("message", (msg) => {
  if (msg.text && msg.text !== "/start") {
    bot.sendMessage(msg.chat.id, `📩 Recibí: ${msg.text}`);
  }
});

module.exports = bot;
