// server.js
require('dotenv').config();  // Ensure you have dotenv installed and set up
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send-order', async (req, res) => {
    const { email, cart } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'ksrm1010@gmail.com',
        subject: 'New Order Received',
        text: `Order Details:\n\n${cart}\n\nCustomer Email: ${email}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
