import React from 'react';
import './PostCard.css'; // Assume you have some CSS for styling

const PostCard = ({ post, onLike, onComment }) => {
    return (
        <div className="post-card">
            <img src={post.imageUrl} alt="Post" className="post-image" />
            <div className="post-content">
                <p className="post-description">{post.description}</p>
                <div className="post-actions">
                    <button onClick={onLike}>Like</button>
                    <button onClick={onComment}>Comment</button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
