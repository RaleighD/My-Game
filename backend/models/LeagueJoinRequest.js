const mongoose = require('mongoose');

const leagueJoinRequestSchema = new mongoose.Schema({
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'League',
      required: true,
    },
    team: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
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
  
  const LeagueJoinRequest = mongoose.model('LeagueJoinRequest', leagueJoinRequestSchema);
  
  module.exports = LeagueJoinRequest;
  