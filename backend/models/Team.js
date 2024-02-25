const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  league: {
    type: Schema.Types.ObjectId,
    ref: 'League'
  },
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
