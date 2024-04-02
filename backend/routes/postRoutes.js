const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const admin = require('firebase-admin');
const verifyToken = require('../utilities/middleware');


// Function to delete image from Firebase Storage
const deleteImageFromFirebase = async (filePath) => {
    const bucket = admin.storage().bucket('my-game-fb475.appspot.com');
    const file = bucket.file(`posts/${filePath}`);
    
    try {
        await file.delete();
    } catch (error) {
        console.error(`Failed to delete ${filePath} from Firebase Storage:`, error);
        // Depending on your error handling strategy, you might want to rethrow the error,
        // or handle it in a way that doesn't interrupt the execution, depending on the context.
        throw new Error(`Failed to delete image from Firebase: ${error.message}`);
    }
};



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
router.patch('/:postId', verifyToken, async (req, res) => {
    const { postId } = req.params;
    const { description, requester } = req.body; 
    
    try {
        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.user._id.toString() !== requester) {
            return res.status(403).json({ message: 'User not authorized to update this post' });
        }

        // Update the description
        post.description = description;
        const updatedPost = await post.save();

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: error.message });
    }
});


router.delete('/:postId', verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.user._id !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to delete this post' });
        }

        // Assuming the Firebase deletion logic is reinstated
        const filePath = post.imageUrl.split('posts%2F')[1].split('?')[0];
        await deleteImageFromFirebase(filePath);

        // Now delete the document from MongoDB
        await Post.deleteOne({ _id: req.params.postId });
        
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error in deletion route:', error);
        res.status(500).json({ message: 'An error occurred processing your request.' });
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