const express = require('express');
const router = express.Router();
const Friendship = require('../models/Friendship');
const User = require('../models/User');

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


router.get('/pending-requests/:recipientId', async (req, res) => {
    try {
      const { recipientId } = req.params;
      const pendingRequests = await Friendship.find({ recipient: recipientId, status: 'pending' });
      res.json(pendingRequests);
    } catch (error) {
      console.error('Error fetching pending friend requests:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Accept a friend request
router.patch('/accept-request/:requestId', async (req, res) => {
    try {
      const { requestId } = req.params;
      const updatedRequest = await Friendship.findByIdAndUpdate(
        requestId,
        { status: 'accepted' },
        { new: true }
      );
      res.json(updatedRequest);
    } catch (error) {
      console.error('Error accepting friend request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Decline a friend request
  router.patch('/decline-request/:requestId', async (req, res) => {
    try {
      const { requestId } = req.params;
      const updatedRequest = await Friendship.findByIdAndUpdate(
        requestId,
        { status: 'declined' },
        { new: true }
      );
      res.json(updatedRequest);
    } catch (error) {
      console.error('Error declining friend request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


// Fetch accepted friend requests for a user, to view their friends list
router.get('/friends/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const friendships = await Friendship.find({
      $or: [{ requester: userId }, { recipient: userId }],
      status: 'accepted'
    });

    let friendList = [];

    for (const friendship of friendships) {
      const friendId = userId === friendship.requester ? friendship.recipient : friendship.requester;
      const friendProfile = await User.findOne({ auth0Id: friendId }); // Adjust 'auth0Id' based on your User schema
      if (friendProfile) {
        friendList.push({
          friendId: friendId,
          nickname: friendProfile.nickname, // Adjust based on your User schema
        });
      }
    }

    console.log("friendList", friendList);
    res.json(friendList);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
  

module.exports = router;
