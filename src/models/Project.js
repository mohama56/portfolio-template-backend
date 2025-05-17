/**
 * PROJECT MODEL
 * =============
 *
 * This file defines the Project database schema (the structure of project data).
 *
 * FOR BEGINNERS:
 * - This describes what information we store about your portfolio projects
 * - Each field has validation to ensure data quality
 *
 * IF YOU WANT TO ADD PROJECT FIELDS:
 * Add new fields in the ProjectSchema below. For example, to add a project status:
 *
 * status: {
 *   type: String,
 *   enum: ['completed', 'in-progress', 'planned'],
 *   default: 'completed'
 * }
 */

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    // Project title
    title: {
        type: String,
        required: [true, 'Please add a project title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },

    // Short description of the project
    slug: {
        type: String,
        unique: true
        // The slug will be created from the title in the pre-save hook below
    },

    // Detailed description of the project
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },

    // Technologies used in the project (array of strings)
    technologies: {
        type: [String],
        required: [true, 'Please add at least one technology']
    },

    // Main image for the project
    image: {
        type: String,
        default: 'default-project.jpg'
    },

    // Additional project images (optional)
    gallery: {
        type: [String]
    },

    // Link to live project
    liveUrl: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },

    // Link to source code (like GitHub)
    sourceUrl: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },

    // Whether this project should be featured prominently
    featured: {
        type: Boolean,
        default: false
    },

    // Display order (lower numbers appear first)
    order: {
        type: Number,
        default: 1000
    },

    // Creation date
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Generate slug from the title
ProjectSchema.pre('save', function(next) {
    if (this.isModified('title') || !this.slug) {
        // Create a slug from the title (lowercase, replace spaces with hyphens)
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
    next();
});

module.exports = mongoose.model('Project', ProjectSchema);