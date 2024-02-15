const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


// POST request to add a new post
router.post('/', async (req, res) => {
    const { description, imageUrl, user } = req.body; // Assuming these are passed in the request body
    try {
        const newPost = new Post({
            description,
            imageUrl,
            user, // Ensure this is the Auth0 user ID or reference to the User document
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//logic for populating posts to the feedpage
router.get('/feed', async (req, res) => {
    try {
        const posts = await Post.find()
                                .sort({ createdAt: -1 })
                                .populate('user', 'nickname'); // Populate the nickname for display
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//like a post
router.put('/:postId/like', async (req, res) => {
    const postId = req.params.postId;
    const userId = req.body.userId; // ID of the user liking the post
    try {
        const post = await Post.findById(postId);
        if (post.likes.includes(userId)) {
            const index = post.likes.indexOf(userId);
            post.likes.splice(index, 1);
        } else {
            post.likes.push(userId);
        }
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//comment on a post
router.post('/:postId/comment', async (req, res) => {
    const { text, user } = req.body; // User should be the commenter's user ID or reference
    try {
        const post = await Post.findById(req.params.postId);
        const comment = { text, user, createdAt: new Date() };
        post.comments.push(comment);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//search a post
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const posts = await Post.find({ $text: { $search: query } });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//update posts
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//viewing a single post. Implement editing with this??
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('user', 'nickname');
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;