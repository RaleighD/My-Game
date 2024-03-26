const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }],
  standings: [{
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    won: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    tied: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
  }],
  schedule: [{
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  }],
  liveScores: [{
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    score: {
      team1: Number,
      team2: Number
    },
    updateTime: { type: Date, default: Date.now }
  }],
  joinRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LeagueJoinRequest'
  }],
}, { timestamps: true });

const League = mongoose.model('League', leagueSchema);
