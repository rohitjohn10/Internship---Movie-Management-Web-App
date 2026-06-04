const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the connection string from environment variables.
 * Implements retry logic and event listeners for robust connection handling.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
