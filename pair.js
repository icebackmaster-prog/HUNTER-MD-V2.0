const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code with WhatsApp.');
});

client.on('ready', () => {
    console.log('✅ WhatsApp session saved! You can now run node index.js');
    client.destroy();
});

client.initialize();
