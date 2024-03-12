const express = require('express');
const SoccerYearlyStat = require('../../models/stat_objects/SoccerYearlyStat');
const router = express.Router();

// POST endpoint for creating document
router.post('/', async (req, res) => {
    try {
        const stats = new SoccerYearlyStat(req.body);
        await stats.save();
        res.status(201).send('Stats saved successfully');
    } catch (error) {
        console.error('Failed to save stats', error);
        res.status(500).send('Error saving stats');
    }
});

module.exports = router;

