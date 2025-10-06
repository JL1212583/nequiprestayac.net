# nequiprestayac.net - Web estática + Bot de Telegram

Proyecto adaptado para servir la parte web estática y ejecutar un bot de Telegram en el mismo contenedor.

## Qué incluye
- `public/` -> tus archivos estáticos (index.html copiado).
- `src/bot.js` -> bot de Telegram (polling).
- `src/server.js` -> servidor Express que sirve `public/` y arranca el bot.
- `Dockerfile`, `docker-compose.yml`, `.env.example`.

## Uso local (sin Docker)
1. Copia `.env.example` a `.env` y coloca tu token:
   ```
   TELEGRAM_BOT_TOKEN=TU_TOKEN_AQUI
   PORT=3000
   ```
2. Instala dependencias:
   ```
   npm install
   ```
3. Ejecuta:
   ```
   npm start
   ```
4. Abre http://localhost:3000 para ver la web.    
   En Telegram, manda /start a tu bot.

## Uso con Docker
1. Copia `.env.example` a `.env` y añade tu token.
2. Construir y levantar:
   ```
   docker-compose build
   docker-compose up -d
   ```
3. Ver logs:
   ```
   docker-compose logs -f
   ```

## Notas
- El bot está configurado en modo polling. Si prefieres webhooks (recomendado en producción), puedo ayudarte a cambiarlo.
- Nunca subas `.env` a GitHub. Usa variables de entorno en tu servicio de hosting.

Si quieres, puedo:
- Personalizar comandos del bot.
- Configurar webhooks y SSL.
- Subir el proyecto arreglado a un repo nuevo en tu GitHub (si me das acceso).
