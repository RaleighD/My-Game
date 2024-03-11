const express = require('express');
const router = express.Router();
const Friendship = require('../models/Friendship');

router.post('/send-friend-request', async (req, res) => {
  const { requester, recipient } = req.body;
  
  try {
    const existingRequest = await Friendship.findOne({ requester, recipient });
    if (existingRequest) {
      return res.status(409).json({ message: 'Friend request already exists.' });
    }

    const newFriendRequest = new Friendship({
      requester,
      recipient,
      status: 'pending',
    });

    await newFriendRequest.save();
    res.json({ message: 'Friend request sent successfully.', friendRequest: newFriendRequest });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
