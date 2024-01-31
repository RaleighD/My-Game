const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    // Add more fields as necessary
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;