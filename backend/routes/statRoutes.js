const express = require('express');
const router = express.Router();

// Assuming you have a middleware to parse JSON bodies
router.post('/api/stats', async (req, res) => {
    const stats = req.body;
    // Process the stats, e.g., save them to a MongoDB database
    try {
        // Save the stats to your database
        // For example: await StatsModel.create(stats);
        res.status(200).json({ message: 'Stats saved successfully' });
    } catch (error) {
        console.error('Failed to save stats', error);
        res.status(500).json({ message: 'Failed to save stats' });
    }
});

module.exports = router;
