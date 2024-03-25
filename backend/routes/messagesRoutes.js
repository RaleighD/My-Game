const express = require('express');
const router = express.Router();
const { Conversation, Message } = require('../models/Messages'); // Ensure the path is correct
const verifyToken = require('../utilities/middleware');
const mongoose = require('mongoose');
const User = require('../models/User');


// In your backend conversation route
router.get('/conversations', verifyToken, async (req, res) => {
    try {
        const conversations = await Conversation.find({/* criteria to match conversations for the user */});
        const populatedConversations = await Promise.all(conversations.map(async (conversation) => {
            const participantsDetails = await User.find({
                'auth0Id': { $in: conversation.participants }
            }, 'auth0Id nickname');
            
            // Replace auth0Id with nickname, keeping the structure you prefer
            const participantNicknames = participantsDetails.map(user => ({
                auth0Id: user.auth0Id,
                nickname: user.nickname
            }));
            
            return {
                ...conversation.toObject(),
                participants: participantNicknames
            };
        }));
        
        res.json(populatedConversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ message: error.message });
    }
});


  
  
module.exports = router;