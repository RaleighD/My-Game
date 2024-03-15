const mongoose = require('mongoose');

const basketballYearlyStatSchema = new mongoose.Schema({
    
    userID: {
        type: String,
        required: true,
    },
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
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    assists: {
        type: Number,
        required: true,
        default: 0,
    },
    rebounds: {
        type: Number,
        required: true,
        default: 0,
    },
    steals: {
        type: Number,
        required: true,
        default: 0,
    },
    blocks: {
        type: Number,
        required: true,
        default: 0,
    },
    turnovers: {
        type: Number,
        required: true,
        default: 0,
    },
    personalFouls: {
        type: Number,
        required: true,
        default: 0,
    },
    fieldGoalsMade: {
        type: Number,
        required: true,
        default: 0,
    },
    fieldGoalsAttempted: {
        type: Number,
        required: true,
        default: 0,
    },
    threePointFieldGoalsMade: {
        type: Number,
        required: true,
        default: 0,
    },
    threePointFieldGoalsAttempted: {
        type: Number,
        required: true,
        default: 0,
    },
    freeThrowsMade: {
        type: Number,
        required: true,
        default: 0,
    },
    freeThrowsAttempted: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtuals for calculating derived basketball statistics

basketballYearlyStatSchema.virtual('pointsPerGame').get(function () {
    return this.gamesPlayed > 0 ? (this.points / this.gamesPlayed).toFixed(2) : 0;
});

basketballYearlyStatSchema.virtual('assistsPerGame').get(function () {
    return this.gamesPlayed > 0 ? (this.assists / this.gamesPlayed).toFixed(2) : 0;
});

basketballYearlyStatSchema.virtual('reboundsPerGame').get(function () {
    return this.gamesPlayed > 0 ? (this.rebounds / this.gamesPlayed).toFixed(2) : 0;
});

basketballYearlyStatSchema.virtual('fieldGoalPercentage').get(function () {
    return this.fieldGoalsAttempted > 0 ? ((this.fieldGoalsMade / this.fieldGoalsAttempted) * 100).toFixed(2) : 0;
});

basketballYearlyStatSchema.virtual('threePointPercentage').get(function () {
    return this.threePointFieldGoalsAttempted > 0 ? ((this.threePointFieldGoalsMade / this.threePointFieldGoalsAttempted) * 100).toFixed(2) : 0;
});

basketballYearlyStatSchema.virtual('freeThrowPercentage').get(function () {
    return this.freeThrowsAttempted > 0 ? ((this.freeThrowsMade / this.freeThrowsAttempted) * 100).toFixed(2) : 0;
});

const BasketballYearlyStat = mongoose.model('BasketballYearlyStat', basketballYearlyStatSchema);

module.exports = BasketballYearlyStat;
