/**
 * USER MODEL
 * ==========
 *
 * This file defines the User database schema (the structure of user data).
 *
 * FOR BEGINNERS:
 * - This describes what information we store about users
 * - It also includes methods for password handling and token generation
 *
 * TO ADD USER FIELDS:
 * Just add new fields inside the UserSchema below (see the example in comments)
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the user schema (this sets what each user document will contain)
const UserSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,
    required: [true, 'Please add a name']
  },

  // User's email
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },

  // User's password
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false // Don't show password by default when querying
  },

  // User role (by default admin - since it's for portfolio owner)
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'admin'
  },

  // When the account was created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash the password before saving the user to the database
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Generate JWT token for authentication
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
      { id: this._id },
      process.env.JWT_SECRET || 'defaultsecretkey123',
      { expiresIn: '30d' }
  );
};

// Match entered password with hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model
module.exports = mongoose.model('User', UserSchema);
