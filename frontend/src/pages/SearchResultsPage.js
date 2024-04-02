import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResultsPage.css'; // Assuming you have a CSS file for styles

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResultsPage = () => {
    const query = useQuery();
    const searchTerm = query.get("query");
    const [results, setResults] = useState({ users: [], posts: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/search-results?query=${searchTerm}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchData();
    }, [searchTerm]);

    return (
        <div className="results-container">
            <h2>Users</h2>
            {results.users && results.users.length > 0 ? (
                results.users.map(user => (
                    <div key={user._id} className="result-item">
                        <Link to={`/profile/${user.auth0Id}`} className="user-link">
                            <img src={user.picture} alt={user.nickname} className="user-image" />
                            <div>{user.nickname}</div>
                        </Link>
                    </div>
                ))
            ) : (
                <p>No users found.</p>
            )}
            <h2>Posts</h2>
            {results.posts && results.posts.length > 0 ? (
                results.posts.map(post => (
                    <div key={post._id} className="result-item">
                        <Link to={`/post/${post._id}`} className="post-link">
                            <div className="post-title">{post.title}</div> {/* Assuming posts have titles */}
                            <p className="post-description">{post.description}</p>
                        </Link>
                    </div>
                ))
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    );
};

export default SearchResultsPage;
