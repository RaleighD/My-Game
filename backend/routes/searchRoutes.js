const express = require('express');
const router = express.Router();

// Import your models
const User = require('./models/User'); // Adjust the path as necessary
const Post = require('./models/Post');
const Team = require('./models/Team');
const League = require('./models/League');

// Route for searching across models
router.get('/', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Please provide a search query.' });
    }

    try {
        // Perform text search on each model
        const userSearch = User.find({ $text: { $search: query } });
        const postSearch = Post.find({ $text: { $search: query } });
        // const teamSearch = Team.find({ $text: { $search: query } });
        // const leagueSearch = League.find({ $text: { $search: query } });

        // Use Promise.all to run searches in parallel
        const [users, posts, teams, leagues] = await Promise.all([
            userSearch,
            postSearch,
            teamSearch,
            leagueSearch
        ]);

        // Combine results into a single object
        const results = {
            users,
            posts,
            teams,
            leagues
        };

        res.json(results);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'An error occurred during the search.' });
    }
});

module.exports = router;
