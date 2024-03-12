const express = require('express');
const GolfYearlyStat = require('../../models/stat_objects/GolfYearlyStat');
const router = express.Router();

// POST endpoint for creating document
router.post('/', async (req, res) => {
    try {
        const stats = new GolfYearlyStat(req.body);
        await stats.save();
        res.status(201).send('Stats saved successfully');
    } catch (error) {
        console.error('Failed to save stats', error);
        res.status(500).send('Error saving stats');
    }
});

module.exports = router;

