import React from 'react';
import './PostCard.css'; // Ensure your CSS is properly set up to handle the layout

// Assuming you're using Font Awesome for icons (or any other icon library)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const PostCard = ({ post, onLike, onComment }) => {
    return (
        <div className="post-card">
            <img src={post.imageUrl} alt="Post" className="post-image" />
            <div className="post-content">
                <p className="post-description">{post.description}</p>
                <div className="post-actions">
                    <button onClick={() => onLike(post._id)}>
                        <FontAwesomeIcon icon={faThumbsUp} /> Like
                    </button>
                    <button onClick={() => onComment(post._id)}>Comment</button>
                </div>
                <div className="post-likes">
                    {/* Display the number of likes */}
                    <FontAwesomeIcon icon={faThumbsUp} />
                    {` ${post.likes.length} Likes`}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
