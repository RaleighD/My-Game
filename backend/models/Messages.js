const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const ConversationSchema = new mongoose.Schema({
  participants: [{
    type: String,
    ref: 'User',
  }],
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);
const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = { Message, Conversation };