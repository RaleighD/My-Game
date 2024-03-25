const express = require('express');
const router = express.Router();
const { Conversation, Message } = require('../models/Messages'); // Ensure the path is correct
const verifyToken = require('../utilities/middleware');
const mongoose = require('mongoose');



router.post('/conversations', verifyToken, async (req, res) => {
    try {
        const { participantIds } = req.body;

        const newConversation = new Conversation({
            participants: participantIds // Directly use auth0Id
        });
  
        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

  
  
module.exports = router;