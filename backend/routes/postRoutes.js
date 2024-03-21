const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


// POST request to add a new post
router.post('/', async (req, res) => {
    const { description, imageUrl, user } = req.body; // Assuming these are passed in the request body
    
    try {
        const newPost = new Post({
            imageUrl,
            description,
            user: {
                _id: user._id,
                nickname: user.nickname,
            }, 
        });
        const savedPost = await newPost.save();
        
        res.status(201).json(savedPost);
    } catch (error) {
        console.error("Failed to save post:", error);
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
        console.log("Post imma like:", post)
        if (post.likes.includes(userId)) {
            const index = post.likes.indexOf(userId);
            post.likes.splice(index, 1);
            console.log("User disliked post");
        } else {
            post.likes.push(userId);
            console.log("User liked post");
        }
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//comment on a post
router.post('/:postId/comment', async (req, res) => {
    const { text, userId, nickname } = req.body; 
    try {
        const post = await Post.findById(req.params.postId);
        const comment = { text, userId, nickname, createdAt: new Date() };
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