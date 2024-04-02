import React, { useState } from 'react';
import './PostCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PostCard = ({ post, onLike, onAddComment, currentUserId, onDelete, onUpdate }) => {
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editDescription, setEditDescription] = useState(post.description);

    const isPostOwner = currentUserId === post.user._id;

    const submitComment = () => {
        onAddComment(post._id, commentText);
        setCommentText('');
        setShowCommentInput(false);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setEditDescription(post.description); // Reset description on cancel
    };
    
    // Handle Description Change
    const handleDescriptionChange = (e) => {
        setEditDescription(e.target.value);
    };

    // Inside PostCard component
    const handleUpdate = () => {
        const updatedDesc = `edited: ${editDescription}`;
        if (updatedDesc !== undefined && post._id) {
            onUpdate(post._id, updatedDesc); // Only pass updatedDesc, since postId is handled in FeedPage
            setEditMode(false);
        } else {
            console.error('Updated description is undefined or postId is missing');
        }
    };


    const handleDelete = () => {
        // Use confirm to ask for confirmation
        const isConfirmed = window.confirm("Are you sure you want to delete this post?");
        if (isConfirmed) {
            onDelete(post._id);
        }
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
            {isPostOwner && (
                <div className="post-actions-top-right">
                    {editMode ? (
                        <>
                            <button className="post-cancel-btn" onClick={toggleEditMode}>Cancel</button>
                            <button className="post-save-btn" onClick={() => handleUpdate(post._id)}>Save</button>
                        </>
                    ) : (
                        <>
                            <button className="post-update-btn" onClick={toggleEditMode}>Edit</button>
                            <button className="post-delete-btn" onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </div>
            )}
    
            {isVideo(post.imageUrl) ? (
                <video controls className="post-media" key={post._id}>
                    <source src={post.imageUrl} type="video/mp4" />
                    Unfortunately, your browser does not support the video tag.
                </video>
            ) : (
                <img src={post.imageUrl} alt="Post" className="post-image" />
            )}
    
            <div className="post-content">
                {editMode ? (
                    <textarea
                        value={editDescription}
                        onChange={handleDescriptionChange}
                        className="edit-description-textarea"
                        placeholder="Edit your post description"
                    ></textarea>
                ) : (
                    <p className="post-description">{post.description}</p>
                )}
    
                <p>Posted by:{' '}
                    <Link to={`/profile/${post.user._id}`} className="post-link">
                        {post.user.nickname}
                    </Link>
                </p>
        
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
                            className="comment-input"
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
                                <strong>
                                    <Link to={`/profile/${comment.userId}`} className="comment-link">
                                        {comment.nickname || 'User'}
                                    </Link>
                                </strong>: {comment.text}
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
