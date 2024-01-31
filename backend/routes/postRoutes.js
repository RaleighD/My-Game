const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// POST request to add a new post
router.post('/add', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;