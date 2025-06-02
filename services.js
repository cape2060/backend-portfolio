const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const emailjs = require('@emailjs/nodejs');

require('dotenv').config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000;

// Load your EmailJS credentials from environment variables
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY; // optional

app.use(cors({
    origin: ['https://www.prajinm.com.np','https://prajinm.com.np', 'http://localhost:3000', 'http://127.0.0.1:3000'], // add your frontend domain here
}));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const templateParams = req.body;

    try {
        const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
            publicKey: PUBLIC_KEY,
            privateKey: PRIVATE_KEY, // optional, depending on your EmailJS config
        });

        res.status(200).json({ success: true, message: 'Email sent successfully', result });
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
