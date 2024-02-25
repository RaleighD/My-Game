const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  auth0Id: { // Unique identifier from Auth0
    type: String,
    required: true,
    unique: true,
  },
  email: { // User's email address
    type: String,
    required: true,
    unique: true,
  },
  name: String, // Full name
  nickname: String, // Nickname
  givenName: String, // Given name
  familyName: String, // Family name
  picture: String, // URL to the profile picture
  locale: String, // Locale
  timeZone: String, // Time zone
  lastUpdate: Date, // Last updated timestamp
  address: String, // Physical address
  phoneNumber: String, // Phone number
  additionalInfo: { // For any additional information you might want to collect through your form
    type: Map,
    of: String
  },
  isProfileComplete: { // Flag to check if user has completed all required fields
    type: Boolean,
    default: false,
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically



// const User = mongoose.model('User', userSchema);

// module.exports = User;
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // Role enum
// const roles = {
//   PLAYER: 'player',
//   TEAM_ORGANIZER: 'team_organizer',
//   LEAGUE_ORGANIZER: 'league_organizer',
//   ADMIN: 'admin'
// };

// const userSchema = new Schema({
//   // ... existing fields ...
//   role: {
//     type: String,
//     enum: Object.values(roles),
//     default: roles.PLAYER, // Default role when a user registers
//     required: true
//   },
//   teams: [{ 
//     type: Schema.Types.ObjectId, 
//     ref: 'Team' 
//   }],
//   leagues: [{ 
//     type: Schema.Types.ObjectId, 
//     ref: 'League' 
//   }]
//   // ... existing fields ...
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
