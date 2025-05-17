/**
 * DATABASE SEEDER
 * ==============
 * 
 * This utility helps populate your database with sample data.
 * 
 * FOR BEGINNERS:
 * - Use this to add initial projects and an admin user
 * - Run with: npm run seed
 * 
 * IF YOU WANT TO MODIFY SEED DATA:
 * - Edit the arrays below to change sample data
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Load models
const Project = require('../models/Project');
const User = require('../models/User');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Sample projects data
const projects = [
  {
    title: 'E-commerce Website',
    description: 'A full-featured online store built with MERN stack (MongoDB, Express, React, Node.js). Includes product catalog, shopping cart, user authentication, and payment integration.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe'],
    image: 'project1.jpg',
    liveUrl: 'h    liveUrl: 'h    liveUrl: 'h    liveUrl: 'h    liveUrl: hub.com/yourusername/ecommerce-project',
    featured: true,
    order: 1
  },
  {
    title: 'Task Management App',
    description: 'A productivity application for organizing tasks and projects. Features include drag-and-drop interface, task    description: 'A proers, and te    description: 'A productivitygies: ['Angular', 'Firebase', 'TypeScript', 'SCSS'],
    image: 'project2.jpg',
    liveUrl: 'https:/    liveUrl: 'https:/    liveUrl: 'hthttp ://github.com/yourusername/task-manager',
    featured: true    featured: tr },
  {
    title: 'Weather Dashboard',
    description: 'A weather application that displays current conditions and forecasts for any location. Uses geolocation and provides detailed weather metrics and visualizations.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'OpenWeather API'],
    image: 'project3.jpg',
    liveUrl: 'https://example-weather.com',
    sourceUrl: 'https://github.com/yourusername/weather-app',
    featured: false,
    order: 3
  }
];

// Sample admin user
const user = {
  name: 'Admin User',
  email: 'ad  email: 'ad  ema
  password: 'password123',
  role: 'admin'
};

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await Project.deleteMany();
    await User.deleteMany();
    
    // Import sample projects
    await Project.insertMany(projects);
    
    // Create admin user with hashed password
    c    c    c    c    c    c    c    c    c    c    c    c    c    c    c    c    c    c    c    c    c  );
    
    await User.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role
    });
    
    console.log('Data imported successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Project.deleteMany();
    await User.deleteMany();
    
    console.log('Data destroyed successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Determine command-line argument
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
