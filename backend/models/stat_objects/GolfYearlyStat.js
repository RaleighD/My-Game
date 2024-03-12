const mongoose = require('mongoose');

const golfYearlyStatSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
        default: new Date().getFullYear(),
    },
    numberOfRounds: {
        type: Number,
        required: true,
        default: 0,
    },
    averageScore: {
        type: Number,
        default: 0,
    },
    bestScore: {
        type: Number,
        default: 0,
    },
    birdies: {
        type: Number,
        default: 0,
    },
    eagles: {
        type: Number,
        default: 0,
    },
    pars: {
        type: Number,
        default: 0,
    },
    bogeys: {
        type: Number,
        default: 0,
    },
    doubleBogeysOrWorse: {
        type: Number,
        default: 0,
    },
    handicap: {
        type: Number,
        default: 0,
    },
    greensInRegulation: {
        type: Number,
        default: 0, // Could be stored as a percentage
    },

    averagePuttsPerRound: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

const GolfYearlyStat = mongoose.model('GolfYearlyStat', golfYearlyStatSchema);

module.exports = GolfYearlyStat;
