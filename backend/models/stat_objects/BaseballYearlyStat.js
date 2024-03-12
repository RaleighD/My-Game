const mongoose = require('mongoose');

const baseballYearlyStatSchema = new mongoose.Schema({

    year: {
        type: Number,
        required: true,
        default: 0,
    },
    team: {
        type: String,
        required: true,
        default: 0,
    },
    league: {
        type: String,
        required: true,
        default: 0,
    },
    games: {
        type: Number,
        required: true,
        default: 0,
    },
    plateAppearances: {
        type: Number,
        required: true,
        default: 0,
    },
    atBats: {
        type: Number,
        required: true,
    },
    runs: {
        type: Number,
        required: true,
        default: 0,
    },
    hits: {
        type: Number,
        required: true,
        default: 0,
    },
    doubles: {
        type: Number,
        required: true,
        default: 0,
    },
    triples: {
        type: Number,
        required: true,
        default: 0,
    },
    homeRuns: {
        type: Number,
        required: true,
        default: 0,
    },
    runsBattedIn: {
        type: Number,
        required: true,
        default: 0,
    },
    stolenBases: {
        type: Number,
        required: true,
        default: 0,
    },
    caughtStealing: {
        type: Number,
        required: true,
        default: 0,
    },
    walks: {
        type: Number,
        required: true,
        default: 0,
    },
    strikeouts: {
        type: Number,
        required: true,
        default: 0,
    },
    hitByPitch: {
        type: Number,
        required: true,
        default: 0,
    },
    sacrificeHits: {
        type: Number,
        required: true,
        default: 0,
    },
    sacrificeFlies: {
        type: Number,
        required: true,
        default: 0,
    },
    intentionalWalks: {
        type: Number,
        required: true,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {  timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

//Virtuals for caluclating derived statistics

baseballYearlyStatSchema.virtual('battingAverage').get(function () {
    if (this.atBats > 0) {
        return (this.hits / this.atBats).toFixed(3); // Formats the batting average to three decimal places
    } else {
        return 0; // Returns 0 if there are no at bats to avoid division by zero
    }
});

baseballYearlyStatSchema.virtual('onBasePercentage').get(function () {
    if (this.plateAppearances > 0) {
        return ((this.hits + this.walks + this.hitByPitch) / this.plateAppearances).toFixed(3);
    } else {
        return 0;
    }
});

baseballYearlyStatSchema.virtual('totalBases').get(function () {
    if (this.plateAppearances > 0) {
        return ((this.hits + this.doubles + (this.triples * 2) + (this.homeRuns * 3)));
    } else {
        return 0;
    }
});

baseballYearlyStatSchema.virtual('sluggingPercentage').get(function () {
    if (this.atBats > 0) {
        return (this.totalBases / this.atBats).toFixed(3);
    } else {
        return 0;
    }
});

baseballYearlyStatSchema.virtual('onBasePlusSlugging').get(function () {
    if (this.atBats > 0) {
        return ((this.totalBases / this.atBats) + ((this.hits + this.walks + this.hitByPitch) /
            this.plateAppearances)).toFixed(3);
    } else {
        return 0;
    }
});


const BaseballYearlyStat = mongoose.model('BaseballYearlyStat', baseballYearlyStatSchema);

module.exports = BaseballYearlyStat;
