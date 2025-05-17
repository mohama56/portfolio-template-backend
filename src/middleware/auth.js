/**
 * AUTH MIDDLEWARE
 * ===============
 *
 * Protects certain routes by requiring a valid login token (JWT).
 *
 * BEGINNER HELP:
 * - When a user logs in, they receive a token.
 * - This middleware checks if the token is present and valid.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect private routes
exports.protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists with Bearer token
  if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token is found, deny access
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    // Decode token and find user by ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecretkey123');
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// Middleware to restrict access to certain roles (like admin only)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role '${req.user.role}' is not authorized for this action`
      });
    }
    next();
  };
};
