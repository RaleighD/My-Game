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

router.get('/:userID', async (req, res) => {
    console.log(`Fetching stats for user: ${req.params.userID}`);
    console.log("hi!");
    try {
        const { userID } = req.params;
        const stats = await SoccerYearlyStat.find({ userID: userID });
        res.json(stats);
        console.log(stats);
    } catch (error) {
        console.error('Failed to fetch soccer stats for user', error);
        res.status(500).send('Error fetching soccer stats');
    }
});

module.exports = router;

