/**
 * PROJECT ROUTES
 * ==============
 * 
 * This file defines the API endpoints for managing portfolio projects.
 * 
 * FOR BEGINNERS:
 * - These endpoints handle creating, reading, updating, and deleting projects
 * - Public endpoints are accessible to everyone
 * - Private endpoints require authentication (login)
 * 
 * AVAILABLE ENDPOINTS:
 * - GET /api/projects - Get all projects (public)
 * - GET /api/projects/:id - Get a single project (public)
 * - POST /api/projects - Create a new project (private)
 * - PUT /api/projects/:id - Update a project (private)
 * - DELETE /api/projects/:id - Delete a project (private)
 * - PUT /api/projects/:id/image - Upload a project image (private)
 */

const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject,
  projectImageUpload
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Protected routes (require login)
router.post('/', protect, authorize('admin'), createProject);
router.put('/:id', protect, authorize('admin'), updateProject);
router.delete('/:id', protect, authorize('admin'), deleteProject);
router.put('/:id/image', protect, authorize('admin'), projectImageUpload);

module.exports = router;
