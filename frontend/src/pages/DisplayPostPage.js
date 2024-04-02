import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/Post/PostCard';

//Debug stuff for now
const onLike = (postId) => console.log(`Like post ${postId}`);
const onAddComment = (postId, comment) => console.log(`Add comment "${comment}" to post ${postId}`);
const onDelete = (postId) => console.log(`Delete post ${postId}`);
const onUpdate = (postId, description) => console.log(`Update post ${postId} with ${description}`);
const { REACT_APP_API_URL } = process.env;

const DisplayPostPage = ({ currentUserId }) => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`${REACT_APP_API_URL}/api/posts/${postId}`);
            if (response.ok) {
                const postData = await response.json();
                setPost(postData);
            } else {
                console.error('Failed to fetch post');
            }
        };

        fetchPost();
    }, [postId]);

    return (
        <div>
            {post ? (
                <PostCard
                    post={post}
                    onLike={onLike}
                    onAddComment={onAddComment}
                    currentUserId={currentUserId}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ) : (
                <p>Loading post...</p>
            )}
        </div>
    );
};

export default DisplayPostPage;
