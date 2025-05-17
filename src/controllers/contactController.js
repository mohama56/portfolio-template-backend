/**
 * CONTACT CONTROLLER
 * ==================
 *
 * This file contains functions for handling contact form submissions.
 *
 * FOR BEGINNERS:
 * - These functions manage the "Contact Me" form on your portfolio
 * - They store messages in the database and can send email notifications
 *
 * IF YOU WANT TO MODIFY CONTACT FUNCTIONALITY:
 * - Update the sendContact function to change how contact submissions work
 * - Modify getContacts to change how you view received messages
 */

const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

/**
 * Send contact message
 * -------------------
 * Handles submission of the contact form.
 *
 * @route   POST /api/contact
 * @access  Public
 */
exports.sendContact = async (req, res) => {
  try {
    // Extract contact data from request body
    const { name, email, message } = req.body;

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      message
    });

    // Setup email (if you want to receive email notifications)
    // IMPORTANT: To use this feature, set up your email credentials in .env file
    if (process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD) {
      try {
        // Create reusable transporter
        const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE || 'gmail',
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
          }
        });

        // Send mail with defined transport object
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USERNAME}>`,
          to: process.env.CONTACT_EMAIL || process.env.EMAIL_USERNAME,
          subject: `New Contact from ${name}`,
          text: `
            You have received a new message from your portfolio contact form:
            
            Name: ${name}
            Email: ${email}
            
            Message:
            ${message}
          `,
          html: `
            <h3>New Portfolio Contact</h3>
            <p>You have received a new message from your portfolio contact form:</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `
        });

        console.log('Email notification sent');
      } catch (emailError) {
        // Log email error but don't stop the API response
        console.error('Email notification failed:', emailError);
      }
    }

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error(error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * Get all contacts
 * ---------------
 * Retrieves all contact form submissions.
 *
 * @route   GET /api/contact
 * @access  Private (Admin only)
 */
exports.getContacts = async (req, res) => {
  try {
    // Get all contacts, newest first
    const contacts = await Contact.find().sort('-createdAt');

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * Get single contact
 * -----------------
 * Retrieves a specific contact submission.
 *
 * @route   GET /api/contact/:id
 * @access  Private (Admin only)
 */
exports.getContact = async (req, res) => {
  try {
    // Find contact by ID
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    // If contact was unread, mark as read
    if (!contact.read) {
      contact.read = true;
      await contact.save();
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error(error);

    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * Delete contact
 * -------------
 * Removes a contact submission from the database.
 *
 * @route   DELETE /api/contact/:id
 * @access  Private (Admin only)
 */
exports.deleteContact = async (req, res) => {
  try {
    // Find contact by ID
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    // Remove contact using findByIdAndDelete (remove() is deprecated)
    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);

    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};