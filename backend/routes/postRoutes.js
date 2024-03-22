const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

//middleware for delete route

const verifyToken = (req, res, next) => {
    // Extract the Authorization header from the incoming request
    const authHeader = req.headers.authorization;

    console.log(`Authorization Header: ${authHeader}`); // Log the Authorization header

    // Check if the Authorization header exists and follows the format 'Bearer <token>'
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract the token from the header
        const token = authHeader.split(' ')[1];

        // Verify the token with your JWT secret
        jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(`JWT Verification Error: ${err.message}`); // Log the verification error
                // If there's an error (e.g., token is invalid or expired), respond with 403 Forbidden
                return res.status(403).json({ message: 'Token is not valid' });
            }

            console.log(`Decoded JWT: ${JSON.stringify(decoded)}`); // Log decoded JWT (consider security/privacy)

            // If token is valid, attach decoded token (including userId) to the request object
            req.user = { id: decoded.userId };
            console.log(`Req User after decoding: ${JSON.stringify(req.user)}`); // Log the req.user object

            // Proceed to the next middleware or route handler
            next();
        });
    } else {
        // If Authorization header is missing or does not start with 'Bearer', respond with 401 Unauthorized
        return res.status(401).json({ message: 'Authorization header not found' });
    }
};



// Function to delete image from Firebase Storage
const deleteImageFromFirebase = async (filePath) => {
    const bucket = admin.storage().bucket('my-game-fb475.appspot.com');
    const file = bucket.file(`posts/${filePath}`);
    
    try {
        await file.delete();
        console.log(`Successfully deleted ${filePath} from Firebase Storage.`);
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