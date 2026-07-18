const express = require('express');
const { check, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const Message = require('../models/Message');

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

    console.log(`[Contact] From ${name} <${email}>: ${subject}`);

    try {
        // 1. Save to MongoDB
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();
        console.log(`[Contact] Message saved to MongoDB with ID: ${newMessage._id}`);

        // 2. Send email via Nodemailer
        if (process.env.EMAIL_FROM && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_FROM,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: `"Portfolio Contact" <${process.env.EMAIL_FROM}>`,
                to: process.env.EMAIL_TO || process.env.EMAIL_FROM,
                subject: `📬 Portfolio Contact: ${subject}`,
                replyTo: email,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0d0d0d; color: #f0ece3; max-width: 600px; margin: 0 auto; border: 1px solid #c9a84c; border-radius: 8px;">
                        <h2 style="color: #c9a84c; border-bottom: 1px solid #333; padding-bottom: 10px;">New Contact Message</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap; background-color: #111; padding: 15px; border-left: 4px solid #c9a84c; border-radius: 4px;">${message}</p>
                    </div>
                `
            };

            const autoReplyOptions = {
                from: `"Muhammed Ajmal PM" <${process.env.EMAIL_FROM}>`,
                to: email,
                subject: `Confirmation: I've received your message!`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #c9a84c;">Hello ${name},</h2>
                        <p>Thank you for reaching out through my portfolio website. I have successfully received your message regarding <strong>"${subject}"</strong>.</p>
                        <p>I typically respond within 24-48 hours. If your request is urgent, feel free to connect with me on LinkedIn.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                        <p>Best regards,<br/><strong>Muhammed Ajmal PM</strong><br/>Full Stack Developer</p>
                        <div style="font-size: 12px; color: #999; margin-top: 20px;">
                            <p>This is an automated confirmation. Please do not reply directly to this email.</p>
                        </div>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            await transporter.sendMail(autoReplyOptions);
            console.log('[Contact] Notification and confirmation emails sent successfully.');
        } else {
            console.warn('[Contact] EMAIL_FROM or EMAIL_PASS not configured. Skipping email send.');
        }

        res.status(200).json({ message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Failed to process contact message:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
