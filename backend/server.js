const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// --- Middleware ---

// Enable Cross-Origin Resource Sharing for frontend communication
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// --- API Routes ---
app.use('/api/movies', movieRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: '🎬 Movie Management API is running' });
});

// --- Server Startup ---
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to MongoDB before starting the server
  await connectDB();

  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
    console.log(` API available at http://localhost:${PORT}/api/movies`);
  });
};

startServer();
