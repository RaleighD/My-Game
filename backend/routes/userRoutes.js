const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken'); 
const verifyToken = require('../utilities/middleware');

// See if the signed-in user is new, if not send them their firebase credential
router.post('/check', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ auth0Id: userId });
    if (user && user.isProfileComplete) {
      const firebaseToken = await admin.auth().createCustomToken(userId);
      const userPayload = { userId: user.auth0Id }; // i think i just need id...
      const secretKey = process.env.REACT_APP_JWT_SECRET; 
      const token = jwt.sign(userPayload, secretKey, { expiresIn: '24h' }); 

      res.json({ exists: true, isComplete: true, firebaseToken, token });
    } else {
      res.json({ exists: user ? true : false, isComplete: false });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/update', async (req, res) => {
  const { userId, displayName, ...otherProfileInfo } = req.body;

  // Explicitly mapping `displayName` to `nickname` if present
  const updatedInfo = displayName ? { ...otherProfileInfo, nickname: displayName } : otherProfileInfo;

  try {
    let user = await User.findOne({ auth0Id: userId });

    if (!user) {
      // If the user doesn't exist, create a new one with all provided info
      user = new User({ auth0Id: userId, ...updatedInfo, isProfileComplete: true });
      await user.save();
    } else {
      // If the user exists, update their information
      user = await User.findOneAndUpdate({ auth0Id: userId }, { ...updatedInfo, isProfileComplete: true }, { new: true });
    }

    console.log('Updated user:', user); // Logging the updated user info
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to get user details by Auth0 ID
router.get('/profile', async (req, res) => {
  const { userId } = req.query; // Assuming userId is passed as a query parameter
  try {
    const user = await User.findOne({ auth0Id: userId });
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete', async (req, res) => {
  const { userId } = req.query; // Assuming userId is passed as a query parameter

  try {
    const result = await User.deleteOne({ auth0Id: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find({});
//using this for the messenger page
router.get('/users', verifyToken, async (req, res) => {
  try {
    // Select only the fields you want to expose for each user
    const users = await User.find({}, 'auth0Id nickname picture').exec(); 
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
