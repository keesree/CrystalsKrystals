// routes/orderRoutes.js
const express = require('express');
const router = express.Router();

// Configure Nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/send-order', async (req, res) => {
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

module.exports = router;
