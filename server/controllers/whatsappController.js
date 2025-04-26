const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

exports.sendWhatsApp = async (req, res) => {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
        return res.status(400).json({ error: 'Phone number and message are required.' });
    }

    try {
        const formattedPhoneNumber = `whatsapp:+${phoneNumber.replace(/[^0-9]/g, '')}`; // Ensure correct format

        const result = await client.messages.create({
            body: message,
            from: `whatsapp:${twilioPhoneNumber}`,
            to: formattedPhoneNumber,
        });

        console.log('WhatsApp message sent:', result.sid);
        res.json({ success: true, messageSid: result.sid });

    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        res.status(500).json({ error: 'Failed to send WhatsApp message.' });
    }
};