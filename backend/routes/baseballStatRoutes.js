const express = require('express');
const BaseballYearlyStat = require('../models/BaseballYearlyStat'); // Adjust path as necessary

const router = express.Router();

// POST endpoint for creating a new BaseballYearlyStat document
router.post('/', async (req, res) => {
    try {
        const stats = new BaseballYearlyStat({
            year: req.body.year,
            team: req.body.tm,
            league: req.body.lg,
            games: req.body.g,
            plateAppearances: req.body.pa,
            atBats: req.body.ab,
            runs: req.body.r,
            hits: req.body.h,
            doubles: req.body.dbl,
            triples: req.body.tpl,
            homeRuns: req.body.hr,
            runsBattedIn: req.body.rbi,
            stolenBases: req.body.sb,
            caughtStealing: req.body.cs,
            walks: req.body.bb,
            strikeouts: req.body.so,
            hitByPitch: req.body.hbp,
            sacrificeHits: req.body.sh,
            sacrificeFlies: req.body.sf,
            intentionalWalks: req.body.ibb
        });
        await stats.save();
        res.status(201).send('Stats saved successfully');
    } catch (error) {
        console.error('Failed to save stats', error);
        res.status(500).send('Error saving stats');
    }
});

module.exports = router;

