/**
 * AUTHENTICATION ROUTES
 * =====================
 * 
 * This file defines the API endpoints for user registration and login.
 * 
 * FOR BEGINNERS:
 * - These endpoints handle creating user accounts and logging in
 * - They are used by the admin area of your portfolio
 * 
 * AVAILABLE ENDPOINTS:
 * - POST /api/auth/register - Create a new user
 * - POST /api/auth/login - Login and get token
 * - GET /api/auth/me - Get current user info
 * - GET /api/auth/logout - Logout user
 */

const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getMe, 
  logout 
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current user (protected route - requires login)
router.get('/me', protect, getMe);

// Logout user
router.get('/logout', logout);

module.exports = router;
