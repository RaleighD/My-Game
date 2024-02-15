const mongoose = require('mongoose');

const baseballYearlyStatSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    league: {
        type: String,
        required: true,
    },
    games: {
        type: Number,
        required: true,
    },
    plateAppearances: {
        type: Number,
        required: true,
    },
    atBats: {
        type: Number,
        required: true,
    },
    runs: {
        type: Number,
        required: true,
    },
    hits: {
        type: Number,
        required: true,
    },
    doubles: {
        type: Number,
        required: true,
    },
    triples: {
        type: Number,
        required: true,
    },
    homeRuns: {
        type: Number,
        required: true,
    },
    runsBattedIn: {
        type: Number,
        required: true,
    },
    stolenBases: {
        type: Number,
        required: true,
    },
    caughtStealing: {
        type: Number,
        required: true,
    },
    walks: {
        type: Number,
        required: true,
    },
    strikeouts: {
        type: Number,
        required: true,
    },
    hitByPitch: {
        type: Number,
        required: true,
    },
    sacrificeHits: {
        type: Number,
        required: true,
    },
    sacrificeFlies: {
        type: Number,
        required: true,
    },
    intentionalWalks: {
        type: Number,
        required: true,
    }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

const BaseballYearlyStat = mongoose.model('BaseballYearlyStat', baseballYearlyStatSchema);

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


module.exports = BaseballYearlyStat;
