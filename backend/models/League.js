const mongoose = require('mongoose');
const { Schema } = mongoose;

const leagueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  games: [{
    type: Schema.Types.ObjectId,
    ref: 'Game' 
  }],

}, { timestamps: true });

const League = mongoose.model('League', leagueSchema);

module.exports = League;