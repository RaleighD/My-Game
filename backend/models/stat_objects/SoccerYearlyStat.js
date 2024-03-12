const mongoose = require('mongoose');

const soccerYearlyStatSchema = new mongoose.Schema({
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
    appearances: {
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
    yellowCards: {
        type: Number,
        required: true,
        default: 0,
    },
    redCards: {
        type: Number,
        required: true,
        default: 0,
    },
    shotsOnTarget: {
        type: Number,
        default: 0,
    },
    cleanSheets: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtuals for derived statistics
soccerYearlyStatSchema.virtual('goalsPerGame').get(function () {
    return this.appearances > 0 ? (this.goals / this.appearances).toFixed(2) : 0;
});

soccerYearlyStatSchema.virtual('assistsPerGame').get(function () {
    return this.appearances > 0 ? (this.assists / this.appearances).toFixed(2) : 0;
});

const SoccerYearlyStat = mongoose.model('SoccerYearlyStat', soccerYearlyStatSchema);

module.exports = SoccerYearlyStat;
