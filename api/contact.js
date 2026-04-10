const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');

// Simple in-memory rate limiting for serverless
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

const cleanOldRateLimits = () => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(ip);
    }
  }
};

const checkRateLimit = (ip) => {
  cleanOldRateLimits();
  const now = Date.now();
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return true;
  }
  const data = rateLimitMap.get(ip);
  if (data.count >= MAX_REQUESTS) {
    return false;
  }
  data.count += 1;
  return true;
};

// Validation middleware wrapper
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const validations = [
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
];

module.exports = async (req, res) => {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Or specify your domain
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  try {
    for (const validation of validations) {
      await runMiddleware(req, res, validation);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0d0d0d; color: #f0ece3;">
          <h2 style="color: #c9a84c;">New Contact Message</h2>
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
          <p>Best regards,<br/>Muhammed Ajmal PM</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    console.log(`[Contact Received] From ${name} (${email}): ${subject}`);

    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
