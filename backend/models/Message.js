const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    minlength: [20, 'Message must be at least 20 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Avoid OverwriteModelError in hot reloading / serverless environments
module.exports = mongoose.models.Message || mongoose.model('Message', messageSchema);
