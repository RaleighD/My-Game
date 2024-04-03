import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResultsPage.css'; // Assuming you have a CSS file for styles

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResultsPage = () => {
    const query = useQuery();
    const searchTerm = query.get("query");
    const [results, setResults] = useState({ users: [], posts: [], teams: [] });
    const { REACT_APP_API_URL } = process.env;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/search-results?query=${searchTerm}`);
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
                            <div className="post-preview-image-container">
                                <img src={post.imageUrl} alt="Post preview" className="post-preview-image" />
                            </div>
                            <p className="post-description">{post.description}</p>
                            <div className="post-user">by {post.user.nickname}</div>
                        </Link>
                    </div>
                ))
            ) : (
                <p>No posts found.</p>
            )}
            <h2>Teams</h2>
            {results.teams && results.teams.length > 0 ? (
                results.teams.map(team => (
                    <div key={team._id} className="result-item">
                        <Link to={`/teams/${team._id}`} className="team-link">{team.name}</Link>
                    </div>
                ))
            ) : (
                <p>No teams found.</p>
            )}
        </div>
    );
};

export default SearchResultsPage;
