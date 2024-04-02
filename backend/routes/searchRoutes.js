const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

router.get('/', async (req, res) => {
    const { query } = req.query;
    try {
        const users = await User.find({ nickname: { $regex: query, $options: 'i' } }); // Update to search by nickname
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
