
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const Team = require('../models/Team');

router.get('/', async (req, res) => {
    const { query } = req.query;
    try {
        const [users, posts, teams] = await Promise.all([
            User.find({ nickname: { $regex: query, $options: 'i' }}),
            Post.find({ description: { $regex: query, $options: 'i' }}),
            Team.find({ name: { $regex: query, $options: 'i' }}),

        ]);

        const results = {
            users,
            posts,
            teams,
        };

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
