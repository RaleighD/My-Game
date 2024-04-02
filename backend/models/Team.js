const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  location: { type: String, required: true },
  sport: { type: String, required: true },
  joinRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeamJoinRequest' }], 
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;