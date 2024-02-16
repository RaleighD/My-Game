const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    user: String, // Store Auth0 user ID as a simple string
});

const PostSchema = new Schema({
    description: { type: String, trim: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    user: String, // Change this to store Auth0 user ID as a simple string
    comments: [CommentSchema] // Embedding the CommentSchema as a subdocument
});

PostSchema.index({ description: 'text' });
PostSchema.index({ comments: 'text'});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
