const express = require('express');
const BaseballYearlyStat = require('../../models/stat_objects/BaseballYearlyStat');
const router = express.Router();

// POST endpoint for creating a new BaseballYearlyStat document
router.post('/', async (req, res) => {
    try {
        const stats = new BaseballYearlyStat(req.body);
        stats.userID = req.body.userID; // Set the user ID from the request body
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
        const stats = await BaseballYearlyStat.find({ userID: userID });
        res.json(stats);
        console.log(stats);
    } catch (error) {
        console.error('Failed to fetch baseball stats for user', error);
        res.status(500).send('Error fetching baseball stats');
    }
});

module.exports = router;

