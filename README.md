# Proyecto adaptado a Telegram (nequiprestayac.net)

Este repositorio contiene una versión adaptada de tu proyecto para funcionar con **Telegram Bot**.
Incluye:
- Bot básico en `src/bot.js` usando `node-telegram-bot-api`.
- Archivos estáticos originales en la carpeta `public/` (se copió `index.html`).
- `Dockerfile` y `docker-compose.yml` para ejecutar en contenedor.
- `.env.example` con la variable necesaria.

## Cómo usar localmente

1. Copia `.env.example` a `.env` y coloca tu token:
   ```
   TELEGRAM_BOT_TOKEN=TU_TOKEN_AQUI
   ```

2. Instala dependencias:
   ```
   npm install
   ```

3. Ejecuta:
   ```
   npm start
   ```

## Con Docker

Construir y levantar con docker-compose:
```
docker-compose build
docker-compose up -d
```

## Notas de seguridad

- Nunca subas `.env` a GitHub.
- Si quieres que el bot use webhooks en lugar de polling, puedo ayudarte a configurarlo.
