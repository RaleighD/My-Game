const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendshipSchema = new Schema({
  requester: { type: String, required: true }, 
  recipient: { type: String, required: true }, 
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'blocked'], 
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = Friendship;
