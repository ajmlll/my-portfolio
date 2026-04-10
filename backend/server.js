const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to express built-in JSON body parser middleware
app.use(express.json());

// Security middleware
app.use(helmet());

// CORS config
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// HTTP Request Logger
app.use(morgan('dev'));

// Global Rate limiter - 100 requests per 15 minutes
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, 
    legacyHeaders: false, 
});
app.use(globalLimiter);

// Routes
app.use('/api/contact', contactRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
