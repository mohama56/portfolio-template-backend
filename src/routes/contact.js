/**
 * CONTACT ROUTES
 * ==============
 * 
 * This file defines the API endpoints for handling contact form submissions.
 * 
 * FOR BEGINNERS:
 * - These endpoints handle contact form submissions and management
 * - The POST endpoint is public (for visitors to your site)
 * - The GET endpoints are private (for you to view messages)
 * 
 * AVAILABLE ENDPOINTS:
 * - POST /api/contact - Submit a contact form (public)
 * - GET /api/contact - Get all contact submissions (private)
 * - GET /api/contact/:id - Get a single contact submission (private)
 * - DELETE /api/contact/:id - Delete a contact submission (private)
 */

const express = require('express');
const router = express.Router();
const { 
  sendContact, 
  getContacts, 
  getContact, 
  deleteContact 
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/', sendContact);

// Protected routes (require login)
router.get('/', protect, authorize('admin'), getContacts);
router.get('/:id', protect, authorize('admin'), getContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router;
