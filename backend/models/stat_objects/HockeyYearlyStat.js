const mongoose = require('mongoose');

const hockeyYearlyStatSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
        default: 0,
    },
    team: {
        type: String,
        required: true,
        default: 'Unknown',
    },
    league: {
        type: String,
        required: true,
        default: 'Unknown',
    },
    gamesPlayed: {
        type: Number,
        required: true,
        default: 0,
    },
    goals: {
        type: Number,
        required: true,
        default: 0,
    },
    assists: {
        type: Number,
        required: true,
        default: 0,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    penaltyMinutes: {
        type: Number,
        required: true,
        default: 0,
    },
    shotsOnGoal: {
        type: Number,
        required: true,
        default: 0,
    },
    shootingPercentage: {
        type: Number,
        required: true,
        default: 0,
    },
    timeOnIcePerGame: {
        type: Number,
        required: true,
        default: 0, // Currently stored in seconds and we can convert later if needed
    },
    plusMinus: {
        type: Number,
        required: true,
        default: 0,
    },
    powerPlayGoals: {
        type: Number,
        required: true,
        default: 0,
    },
    shortHandedGoals: {
        type: Number,
        required: true,
        default: 0,
    },
    gameWinningGoals: {
        type: Number,
        required: true,
        default: 0,
    },
    // Goalie-specific stats - Not sure how many of these we REALLY need cuz goalies are weird
    goalsAgainstAverage: {
        type: Number,
        default: 0,
    },
    savePercentage: {
        type: Number,
        default: 0,
    },
    wins: {
        type: Number,
        default: 0,
    },
    losses: {
        type: Number,
        default: 0,
    },
    shutouts: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtuals for calculating derived statistics

hockeyYearlyStatSchema.virtual('pointsPerGame').get(function () {
    return this.gamesPlayed > 0 ? (this.points / this.gamesPlayed).toFixed(2) : 0;
});

// Example of a complex derived stat; others can be added as needed
hockeyYearlyStatSchema.virtual('goalieSavePercentage').get(function () {
    // Assuming shotsAgainst and saves are tracked but not directly stored
    // These would need to be added to the schema if used for this calculation
    const shotsAgainst = this.shotsOnGoal; // Placeholder, adjust as needed
    const saves = shotsAgainst - this.goals; // Placeholder, adjust as needed
    return shotsAgainst > 0 ? ((saves / shotsAgainst) * 100).toFixed(2) : 0;
});

const HockeyYearlyStat = mongoose.model('HockeyYearlyStat', hockeyYearlyStatSchema);

module.exports = HockeyYearlyStat;
