import React, { useState } from 'react';
import './PostCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const PostCard = ({ post, onLike, onAddComment }) => {
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState('');

    const submitComment = () => {
        onAddComment(post._id, commentText);
        setCommentText('');
        setShowCommentInput(false);
    };

    // Function to determine if the URL is for a video
    const isVideo = (url) => {
        // This regex looks for .mp4 or .webm occurring anywhere before a ? or at the end of the string
        const videoPattern = /\.(mp4|webm)(\?|$)/i;
        return videoPattern.test(url);
      };

    // Function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="post-card">
            {isVideo(post.imageUrl) ? (
                <video controls className="post-media" key={post._id}>
                    <source src={post.imageUrl} type="video/mp4" />
                    Unfortunately, your browser does not support the video tag.
                </video>
            ) : (
                <img src={post.imageUrl} alt="Post" className="post-image" />
            )}
            <div className="post-content">
                <p className="post-description">{post.description}</p>
                <div className="post-actions">
                    <button onClick={() => onLike(post._id)}>
                        <FontAwesomeIcon icon={faThumbsUp} /> Like
                    </button>
                    <button onClick={() => setShowCommentInput(!showCommentInput)}>Comment</button>
                </div>
                {showCommentInput && (
                    <div>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                        ></textarea>
                        <button onClick={submitComment}>Submit Comment</button>
                    </div>
                )}
                <div className="post-likes">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    {` ${post.likes.length} Likes`}
                </div>
                <div className="post-comments">
                    <h4>Comments:</h4>
                    {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <strong>{comment.user}: </strong>
                                {comment.text}
                                <div className="comment-date">
                                    {formatDate(comment.createdAt)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
