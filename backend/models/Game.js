const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  sportType: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  scores: {
    team1: Number,
    team2: Number
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: 'League'
  },
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  details: {
    type: String,
  },
  referees: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

