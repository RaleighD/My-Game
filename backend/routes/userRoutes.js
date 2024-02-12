const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

// See if the signed-in user is new
router.post('/check', async (req, res) => {
  const { userId } = req.body; 
  console.log("userID",userId);
  try {
    const user = await User.findOne({ auth0Id: userId });
    console.log('User details:', user); // Console log the user details
    if (user && user.isProfileComplete) {
      res.json({ exists: true, isComplete: true });
    } else {
      res.json({ exists: user ? true : false, isComplete: false });
    }
  } catch (error) {
    console.error('Error checking user:', error); // Console log any errors
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/update', async (req, res) => {
  const { userId, ...profileInfo } = req.body;
  try {
    // Try to find the user
    let user = await User.findOne({ auth0Id: userId });

    // If the user doesn't exist, create a new user
    if (!user) {
      user = new User({ auth0Id: userId, ...profileInfo });
    } else {
      // Update the user's profile information
      user = await User.findOneAndUpdate({ auth0Id: userId }, { ...profileInfo, isProfileComplete: true }, { new: true });
    }

    console.log('Updated user:', user); // Console log the updated user details

    res.json({ success: true, user });
    console.log("Updated user successfully");
  } catch (error) {
    console.error('Error updating user:', error); // Console log any errors
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
