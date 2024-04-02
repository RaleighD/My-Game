const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  nickname: String,
  givenName: String,
  familyName: String,
  picture: String,
  locale: String,
  timeZone: String,
  lastUpdate: Date,
  address: String,
  phoneNumber: String,
  additionalInfo: {
    type: Map,
    of: String
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['none', 'player', 'team_organizer', 'league_organizer', 'admin'],
    default: 'none',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
