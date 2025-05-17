// PORTFOLIO BACKEND MAIN FILE
// ===========================
// 
// This is the main entry point for your portfolio backend.
// It sets up the server, connects to the database, and defines routes.
// 
// FOR BEGINNERS:
// - This file is the starting point of your application
// - It connects all the different parts together
// 
// HOW TO USE THIS FILE:
// 1. Make sure you've set up your.env file with your database connection
// 2. Run 'npm start' to start the server in production mode
// 3. Or run 'npm run dev' to start the server in development mode
//

// Import required packages
// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Import route files
const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');


// Connect to database
connectDB();

// Create Express application
const app = express();

////ody parser middleware
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors()); // Use cors() instead of requiring cors package

// Add security headers
app.use(helmet());

// Development logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Use morgan() instead of requiring morgan package
}

// File upload middleware
app.use(fileUpload({
  limits: { fileSize: 1000000 }, // 1MB max file size
  abortOnLimit: true,
  createParentPath: true
}));

// Set static folder for uploaded file
app.use(express.static(path.join(__dirname, '../public')));

// Mount routers
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes); // corrected spelling

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Portfolio Backend API',
    documentation: '/api-docs'
  });
});


// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ // Use res.status() and res.json() instead of requiring status and json packages
    success: false,
    message: 'Route not found'
  });
});

// Set port
const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║   Portfolio Backend Server Running!                                ║
║                                                                    ║
║   → Local:   http://localhost:${PORT}                              ║
║   → API:     http://localhost:${PORT}/api                          ║
║   → Mode:    ${process.env.NODE_ENV || 'development'}              ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
`);


});

// Handle unhandled promise rejections
process.on('unhandledRejection', (erp) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;