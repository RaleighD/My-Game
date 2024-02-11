const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
require('dotenv').config();

const app = express();

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
   
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB Atlas: ${err}`);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

module.exports = app; // Export the configured app
