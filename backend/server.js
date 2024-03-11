const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const friendshipRoutes = require('./routes/friendshipRoutes');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseKey.json');
const baseballStatRoutes = require('./routes/baseballStatRoutes');


// Load environment variables
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); //change for production
app.use(express.json());


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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/friendships', friendshipRoutes);
app.use('/api/baseball/stats', baseballStatRoutes);

module.exports = app; // Export the configured app
