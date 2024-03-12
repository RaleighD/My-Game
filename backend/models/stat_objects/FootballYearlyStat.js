const mongoose = require('mongoose');

const footballYearlyStatSchema = new mongoose.Schema({
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
    passingYards: {
        type: Number,
        required: true,
        default: 0,
    },
    passingTouchdowns: {
        type: Number,
        required: true,
        default: 0,
    },
    interceptionsThrown: {
        type: Number,
        required: true,
        default: 0,
    },
    rushingYards: {
        type: Number,
        required: true,
        default: 0,
    },
    rushingTouchdowns: {
        type: Number,
        required: true,
        default: 0,
    },
    receptions: {
        type: Number,
        required: true,
        default: 0,
    },
    receivingYards: {
        type: Number,
        required: true,
        default: 0,
    },
    receivingTouchdowns: {
        type: Number,
        required: true,
        default: 0,
    },
    fumbles: {
        type: Number,
        required: true,
        default: 0,
    },
    sacks: {
        type: Number,
        default: 0,
    },
    interceptionsCaught: {
        type: Number,
        default: 0,
    },
    tackles: {
        type: Number,
        default: 0,
    },
    forcedFumbles: {
        type: Number,
        default: 0,
    },
    fumbleRecoveries: {
        type: Number,
        default: 0,
    },
    defensiveTouchdowns: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

const FootballYearlyStat = mongoose.model('FootballYearlyStat', footballYearlyStatSchema);

module.exports = FootballYearlyStat;
