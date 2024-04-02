const express = require('express');
const router = express.Router();
const { Conversation, Message } = require('../models/Messages'); // Ensure the path is correct
const verifyToken = require('../utilities/middleware');
const mongoose = require('mongoose');
const User = require('../models/User');


router.get('/conversations', verifyToken, async (req, res) => {
    try {
        console.log('req', req);
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

// POST route to create a new conversation
router.post('/conversations', verifyToken, async (req, res) => {
    try {
        const { participantIds } = req.body;
        
        const existingConversation = await Conversation.findOne({
            participants: { $all: participantIds, $size: participantIds.length }
        });

        if (existingConversation) {
            return res.status(400).json({ message: "A conversation with these participants already exists." });
        }

        const newConversation = new Conversation({
            participants: participantIds,
        });

        await newConversation.save();

        
        const populatedConversation = await User.find({
            auth0Id: { $in: participantIds }
        }).then(users => {
            return {
                ...newConversation.toObject(),
                participants: users.map(user => ({
                    nickname: user.nickname,
                    auth0Id: user.auth0Id,
                    picture: user.picture,
                })),
            };
        });

        res.status(201).json(populatedConversation);
    } catch (error) {
        console.error('Error creating new conversation:', error);
        res.status(500).json({ message: error.message });
    }
});


router.get('/:conversationId/messages', verifyToken, async (req, res) => {
    try {
        const { conversationId } = req.params;
        
        const conversation = await Conversation.findById(conversationId);
        if (!conversation.participants.includes(req.user.id)) {
            return res.status(403).json({ message: "User not authorized to view these messages." });
        }

        const messages = await Message.find({ conversationId });

        // Manually fetch and attach user details including auth0Id
        const messagesWithUserDetails = await Promise.all(messages.map(async (message) => {
            const user = await User.findOne({ auth0Id: message.sender });
            return {
                ...message.toObject(),
                sender: user ? {
                    nickname: user.nickname,
                    picture: user.picture,
                    auth0Id: user.auth0Id // Include Auth0 ID
                } : null,
                createdAt: message.createdAt
            };
        }));

        res.json(messagesWithUserDetails);
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

router.post('/conversations/:conversationId/leave', verifyToken, async (req, res) => {
    const { conversationId } = req.params;
    const userAuth0Id = req.user.id;

    try {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found." });
        }
        
        if (!conversation.participants.includes(userAuth0Id)) {
            return res.status(403).json({ message: "User not authorized to leave this conversation." });
        }

        
        conversation.participants = conversation.participants.filter(participantId => participantId !== userAuth0Id);

        // If no participants are left delete the conversation and its messages
        if (conversation.participants.length === 0) {
            
            await Message.deleteMany({ conversationId: conversation._id });
            await Conversation.findByIdAndDelete(conversation._id); 
            res.json({ message: "Conversation and messages have been deleted." });
        } else {
            
            const userLeaving = await User.findOne({ auth0Id: userAuth0Id });
            const leaveMessageBody = `${userLeaving.nickname} has left the conversation.`;

            const leaveMessage = new Message({
                conversationId: conversation._id,
                body: leaveMessageBody,
                sender: userAuth0Id, 
            });

            await leaveMessage.save();
            await conversation.save();
            res.json({ message: "User has left the conversation.", systemMessage: leaveMessageBody });
        }
    } catch (error) {
        console.error('Error leaving conversation:', error);
        res.status(500).json({ message: error.message });
    }
});


  
  
module.exports = router;