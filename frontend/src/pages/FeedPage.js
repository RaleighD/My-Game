import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../components/Post/CreatePost';
import Modal from '../components/Post/Modal';
import PostCard from '../components/Post/PostCard';
import { useAuth0 } from "@auth0/auth0-react";
import { getAuth, signInWithCustomToken } from 'firebase/auth';


const FeedPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const { REACT_APP_API_URL } = process.env;
    const [commentingPostId, setCommentingPostId] = useState(null);
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [newComment, setNewComment] = useState('');

    
    useEffect(() => {
        const checkUserProfileCompletion = async () => {
          if (!isAuthenticated) return;
      
          try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${REACT_APP_API_URL}/api/users/check`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ userId: user.sub }),
            });
            const data = await response.json();
      
            if (!data.isComplete) {
              navigate('/register');
            } else {
              // If profile is complete and we received a Firebase token
              if (data.firebaseToken) {
                // Authenticate with Firebase using the received custom token
                console.log("Recieved a firebase token >:]: ", data.firebaseToken);
                const auth = getAuth();
                signInWithCustomToken(auth, data.firebaseToken)
                  .then((firebaseUser) => {
                    // Firebase user authenticated
                    fetchPosts(); // Now fetch posts
                  })
                  .catch((firebaseError) => {
                    console.error('Firebase authentication failed:', firebaseError);
                  });
              }
            }
          } catch (error) {
            console.error('Error checking user profile completion:', error);
          }
        };
      
        checkUserProfileCompletion();
    }, [isAuthenticated, user?.sub, getAccessTokenSilently, navigate]);
      

    const fetchPosts = async () => {
        // Existing logic to fetch posts
        try {
            const response = await axios.get(`${REACT_APP_API_URL}/api/posts/feed`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleLike = async (postId) => {
        try {
            // Assuming you have an endpoint to handle likes which toggles the like status
            await axios.put(`${REACT_APP_API_URL}/api/posts/${postId}/like`, {}, {
                headers: { Authorization: `Bearer ${await getAccessTokenSilently()}` },
            });
            // Optimistically update the UI without refetching all posts
            setPosts(posts.map(post => {
                if (post._id === postId) {
                    // This is a simplistic approach; adapt based on how your backend handles likes
                    const isLiked = post.likes.includes(user.sub); // Check if the user already liked the post
                    if (isLiked) {
                        return { ...post, likes: post.likes.filter(id => id !== user.sub) }; // Remove like
                    } else {
                        return { ...post, likes: [...post.likes, user.sub] }; // Add like
                    }
                }
                return post;
            }));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };
    
    

    const handleOpenCommentModal = (postId) => {
        setCommentingPostId(postId);
        setCommentModalOpen(true);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            await axios.post(`${REACT_APP_API_URL}/api/posts/${commentingPostId}/comment`, 
                { text: newComment, user: user.sub }, 
                { headers: { Authorization: `Bearer ${await getAccessTokenSilently()}` } }
            );
            // Close the modal and clear the comment
            setCommentModalOpen(false);
            setNewComment('');
            // Optionally, refresh posts or update the specific post to show the new comment
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Existing modal and post creation logic
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <div>
            <button onClick={handleOpenModal}>Create Post</button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <CreatePost />
            </Modal>
            <div>
                {posts.map(post => (
                    <PostCard 
                        key={post._id} 
                        post={post} 
                        onLike={() => handleLike(post._id)}
                        onComment={() => handleOpenCommentModal(post._id)} 
                    />
                ))}
            </div>
    
            {/* Comment Modal Logic */}
            <Modal isOpen={commentModalOpen} onClose={() => setCommentModalOpen(false)}>
                <div>
                    <textarea
                        value={newComment}
                        onChange={handleCommentChange}
                        placeholder="Write a comment..."
                    ></textarea>
                    <button onClick={handleCommentSubmit}>Submit Comment</button>
                </div>
            </Modal>
        </div>
    );
    
};

export default FeedPage;
