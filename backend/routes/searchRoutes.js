
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    const { query } = req.query;
    try {
        const [users, posts] = await Promise.all([
            User.find({ nickname: { $regex: query, $options: 'i' }}),
            Post.find({ description: { $regex: query, $options: 'i' }})
        ]);

        const results = {
            users,
            posts
        };

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
