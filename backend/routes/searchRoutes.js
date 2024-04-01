const express = require('express');
const router = express.Router();

// Import your models
const User = require('../models/User'); // Adjust the path as necessary
const Post = require('../models/Post');
const Team = require('../models/Team');
const League = require('../models/League');

router.get('/search', async (req, res) => {
    try {
        const users = await User.find(); // Get all users
        console.log(users); // Log to see if users are being retrieved
        res.json(users);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        res.status(500).send('Error fetching users');
    }
});




// // Unified route for searching across models
// router.get('/', async (req, res) => {
//     const { query } = req.query;
//
//     if (!query) {
//         return res.status(400).json({ message: 'Please provide a search query.' });
//     }
//
//     try {
//
//         const userSearch = User.find({ $text: { $search: query } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });
//         // const postSearch = Post.find({ $text: { $search: query } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });
//         // const teamSearch = Team.find({ $text: { $search: query } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });
//         // const leagueSearch = League.find({ $text: { $search: query } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });
//
//         // Execute all searches in parallel
//         const [users] = await Promise.all([
//             userSearch,
//             // postSearch,
//             // teamSearch,
//             // leagueSearch
//         ]);
//
//         // Combine and send results
//         const results = { users, posts, teams, leagues };
//         res.json(results);
//     } catch (error) {
//         console.error('Search error:', error);
//         res.status(500).json({ message: 'An error occurred during the search.' });
//     }
// });

module.exports = router;
