const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Database Connection
mongoose.connect('mongodb://localhost/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

module.exports = app; // Export the configured app



