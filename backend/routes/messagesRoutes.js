const express = require('express');
const router = express.Router();
const { Conversation, Message } = require('../models/Messages'); // Ensure the path is correct




router.get('/conversations', async (req, res) => {
    try {
      const conversations = await Conversation.find({
        participants: req.user.sub
      }).populate('participants');
      res.json(conversations);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
module.exports = router;