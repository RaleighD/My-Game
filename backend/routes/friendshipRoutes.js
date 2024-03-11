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
  
  // In your friendshipRoutes.js or a similar file

// Fetch accepted friend requests for a user, to view their friends list
router.get('/friends/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const friends = await Friendship.find({
        $or: [{ requester: userId }, { recipient: userId }],
        status: 'accepted'
      }).populate('requester recipient', 'nickname'); // Adjust according to your user model and what data you want to return
  
      // Optionally, transform the friends array to unify the structure regardless of who is the requester or recipient
      const friendList = friends.map(friendship => {
        // Assuming your user model has a field 'nickname' you want to show
        return {
          friendId: userId === friendship.requester.toString() ? friendship.recipient._id : friendship.requester._id,
          nickname: userId === friendship.requester.toString() ? friendship.recipient.nickname : friendship.requester.nickname
        };
      });
  
      res.json(friendList);
    } catch (error) {
      console.error('Error fetching friends:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

module.exports = router;
