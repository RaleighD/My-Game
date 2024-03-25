const express = require('express');
const router = express.Router();
const { Conversation, Message } = require('../models/Messages'); // Ensure the path is correct
const verifyToken = require('../utilities/middleware');
const mongoose = require('mongoose');
const User = require('../models/User');


// In your backend conversation route
// Assuming you've adjusted your Conversation schema to use String for participant IDs

router.get('/conversations', verifyToken, async (req, res) => {
    try {
        // Assuming req.user.id contains the Auth0 ID of the current user
        const userAuth0Id = req.user.id;

        const conversations = await Conversation.find({
            participants: userAuth0Id // Find conversations where the current user is a participant
        });

        // Now populate participant details for each conversation
        const populatedConversations = await Promise.all(conversations.map(async (convo) => {
            // Map participant Auth0 IDs to user nicknames
            const participantsDetails = await User.find({
                auth0Id: { $in: convo.participants }
            });

            // Extract nicknames from participant details
            const participantNicknames = participantsDetails.map(user => user.nickname);

            return {
                ...convo.toObject(),
                participants: participantNicknames.filter(nickname => nickname !== req.user.nickname) // Exclude current user's nickname
            };
        }));

        console.log('populatedConversations:', populatedConversations);
        res.json(populatedConversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:conversationId/messages', verifyToken, async (req, res) => {
    try {
        const { conversationId } = req.params;
        
        // Verify if the requesting user is part of the conversation
        const conversation = await Conversation.findById(conversationId);
        if (!conversation.participants.includes(req.user.id)) {
            return res.status(403).json({ message: "User not authorized to view these messages." });
        }

        const messages = await Message.find({ conversationId }).populate('sender', 'nickname');

        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/:conversationId/messages', verifyToken, async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { body } = req.body;

        // Verify if the requesting user is part of the conversation
        const conversation = await Conversation.findById(conversationId);
        if (!conversation.participants.includes(req.user.id)) {
            return res.status(403).json({ message: "User not authorized to post messages to this conversation." });
        }

        const newMessage = new Message({
            conversationId,
            body,
            sender: req.user.id 
        });

        await newMessage.save();

    
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error posting new message:', error);
        res.status(500).json({ message: error.message });
    }
});


  
  
module.exports = router;