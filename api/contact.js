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

    // Validate environment variables
    if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      console.error('Missing configuration: EMAIL_FROM, EMAIL_PASS, or EMAIL_TO');
      return res.status(500).json({ message: 'Mail server configuration missing.' });
    }

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
      to: process.env.EMAIL_TO,
      subject: `📬 New Message from ${name}: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #c9a84c; border-radius: 8px; overflow: hidden; background-color: #000; color: #fff;">
          <div style="background-color: #c9a84c; color: #000; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Portfolio Inquiry</h1>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 10px;"><strong>Client Details</strong></p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            
            <p style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 10px; margin-top: 30px;"><strong>Message Content</strong></p>
            <div style="background-color: #111; padding: 15px; border-radius: 4px; border-left: 4px solid #c9a84c; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="background-color: #111; padding: 15px; font-size: 12px; color: #888; text-align: center;">
            <p>Sent from portfolio at ${new Date().toLocaleString()}</p>
            <p>Source IP: ${clientIp}</p>
          </div>
        </div>
      `
    };

    const autoReplyOptions = {
      from: `"Muhammed Ajmal PM" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: `Confirmation: I've received your message!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h2 style="color: #c9a84c;">Hello ${name},</h2>
          <p>Thank you for reaching out through my portfolio website. I've successfully received your message regarding <strong>"${subject}"</strong>.</p>
          <p>I typically respond to all inquiries within 24-48 hours. If your request is urgent, feel free to connect with me on LinkedIn as well.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
          <p>Best regards,<br/><strong>Muhammed Ajmal PM</strong><br/>Full Stack Developer</p>
          <div style="font-size: 12px; color: #999; margin-top: 20px;">
            <p>This is an automated confirmation. Please do not reply directly to this email unless I reach out first.</p>
          </div>
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
