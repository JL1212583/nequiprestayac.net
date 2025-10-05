/**
 * Configuración centralizada de Discord
 * 
 * IMPORTANTE: Esta webhook será usada por TODOS los usuarios del sistema.
 * Configura aquí tu webhook de Discord y todos los usuarios enviarán mensajes a este canal.
 */

const DISCORD_WEBHOOK_CONFIG = {
    // Webhook configurado para el sistema
    webhookUrl: 'https://discordapp.com/api/webhooks/1413669710268207267/A1y0MPJbLRBHonA6W1nw7DiSWQhLRUGNo96SGXmUEE7BcsB0lUaF90i2ppr03X7hSY1x',
    
    // Configuración del bot
    botName: 'Sistema Nequi',
    avatarUrl: 'https://i.imgur.com/4M34hi2.png',
    
    // Colores para los embeds
    colors: {
        success: 0x00FF00,    // Verde
        error: 0xFF0000,      // Rojo  
        info: 0x0099FF,       // Azul
        warning: 0xFFFF00,    // Amarillo
        nequi: 0xFF69B4       // Rosa Nequi
    },
    
    // Configuración de seguridad (opcional)
    // Puedes agregar aquí validaciones adicionales
    security: {
        // Si quieres limitar desde qué dominios se puede usar
        allowedDomains: ['localhost', '127.0.0.1'],
        
        // Si quieres requerir un token adicional
        requireToken: false,
        token: null
    }
};

// Validar que la webhook esté configurada
if (DISCORD_WEBHOOK_CONFIG.webhookUrl.includes('YOUR_WEBHOOK_ID')) {
    console.error('%c3%a2%c2%9a%c2%a0%c3%af%c2%b8%c2%8f%20ATENCI%c3%83%c2%93N_%20Debes%20configurar%20tu%20webhook%20de%20Discord%20en%20js/discord-config.html');
    console.error('Edita el archivo y reemplaza YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN con tu webhook real');
}

// Exportar configuración
window.DISCORD_WEBHOOK_CONFIG = DISCORD_WEBHOOK_CONFIG;