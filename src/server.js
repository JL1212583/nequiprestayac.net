const express = require('express');
const path = require('path');
require('dotenv').config();

// Import y arranque del bot (importa src/bot.js que arranca el polling)
require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde public/
app.use(express.static(path.join(__dirname, '../public')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', bot: !!process.env.TELEGRAM_BOT_TOKEN });
});

app.listen(PORT, () => {
  console.log(`🌐 Web corriendo en http://localhost:${PORT}`);
});
