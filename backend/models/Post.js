const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' } // Assuming you have a User model
});

const PostSchema = new Schema({
    description: { type: String, trim: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [CommentSchema] // Embedding the CommentSchema as a subdocument
});

PostSchema.index({ description: 'text' }); //will be used for searchbar functionality
PostSchema.index({ comments: 'text'});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;