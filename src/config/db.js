/**
 * DATABASE CONNECTION
 * ==================
 * 
 * This file handles connecting to MongoDB.
 * 
 * FOR BEGINNERS:
 * - This sets up the connection to your database
 * - You usually won't need to modify this file
 * 
 * IF YOU NEED TO CHANGE DATABASE SETTINGS:
 * - Update your MongoDB connection string in the .env file
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
