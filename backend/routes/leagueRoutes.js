const express = require('express');
const League = require('../models/League');
const router = express.Router();

// POST endpoint for creating a new League
router.post('/', async (req, res) => {
    try {
        const league = new League(req.body);
        await league.save();
        res.status(201).send('League Created Successfully');
    } catch (error) {
        console.error('Failed to save League', error);
        res.status(500).send('Error Creating League');
    }
});

module.exports = router;

