const mongoose = require('mongoose');

const teamJoinRequestSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  requestDate: { type: Date, default: Date.now }, 
  responseDate: Date, 
}, { timestamps: true });

const TeamJoinRequest = mongoose.model('TeamJoinRequest', teamJoinRequestSchema);

module.exports = TeamJoinRequest;

