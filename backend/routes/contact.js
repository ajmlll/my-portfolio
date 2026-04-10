const express = require('express');
const { check, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const router = express.Router();

// Rate limiter specifically for contact form: 5 messages per hour
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message: { message: 'Too many messages sent from this IP, please try again after an hour' }
});

// In-memory array log for messages (as requested, though normally we'd use a DB)
const messageLog = [];

router.post('/', contactLimiter, [
    check('name')
        .trim()
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
        .escape(),
    check('email')
        .trim()
        .isEmail().withMessage('Valid email is required')
        .normalizeEmail(),
    check('subject')
        .trim()
        .notEmpty().withMessage('Subject is required')
        .escape(),
    check('message')
        .trim()
        .isLength({ min: 20 }).withMessage('Message must be at least 20 characters')
        .escape()
], async (req, res) => {
    
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Log to in-memory array and console
    const newMsg = { name, email, subject, message, date: new Date() };
    messageLog.push(newMsg);
    console.log(`[Contact] From ${name} <${email}>: ${subject}`);

    try {
        // Only attempt to send if EMAIL_FROM is configured (to prevent crash in dev)
        if (process.env.EMAIL_FROM && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_FROM,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: process.env.EMAIL_TO || process.env.EMAIL_FROM,
                subject: `Portfolio Contact: ${subject}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0d0d0d; color: #f0ece3;">
                        <h2 style="color: #c9a84c;">New Contact Message from Portfolio</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <hr style="border-color: #333;" />
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                `
            };

            const autoReplyOptions = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: `Thank you for contacting Muhammed Ajmal PM`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2>Hi ${name},</h2>
                        <p>Thank you for reaching out! I have received your message regarding "${subject}" and will get back to you as soon as possible.</p>
                        <p>Best regards,<br/>Muhammed Ajmal PM<br/>Full Stack Developer</p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            await transporter.sendMail(autoReplyOptions);
        } else {
            console.warn('EMAIL_FROM or EMAIL_PASS not configured. Skipping email send.');
        }

        res.status(200).json({ message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Email sending failed:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
