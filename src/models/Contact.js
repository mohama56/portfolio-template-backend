/**
 * CONTACT MODEL
 * =============
 * 
 * This file defines the Contact database schema (the structure of contact form submissions).
 * 
 * FOR BEGINNERS:
 * - This describes what information we store about contact form submissions
 * - Each field has validation to ensure data quality
 * 
 * IF YOU WANT TO ADD CONTACT FIELDS:
 * Add new fields in the ContactSchema below. For example, to add a subject line:
 * 
 * subject: {
 *   type: String,
 *   required: [true, 'Please add a subject'],
 *   maxlength: [100, 'Subject cannot be more than 100 characters']
 * }
 */

const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  // Name of the person contacting you
  name: {
    type: String,
    required: [true, 'Please add your name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  
  // Email address of the person contacting you
  email: {
    type: String,
    required: [true, 'Please add your email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  
  // The message content
  message: {
    type: String,
    required: [true, 'Please add a message'],
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  
  // Whether this message has been read by the admin
  read: {
    type: Boolean,
    default: false
  },
  
  // When the message was submitted
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
