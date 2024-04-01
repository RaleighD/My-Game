import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
    const query = useQuery().get('query');
    const [results, setResults] = useState({ users: [], posts: [], teams: [], leagues: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;

            setLoading(true);
            try {
                const response = await axios.get(`/api/search?query=${encodeURIComponent(query)}`);
                setResults(response.data);
            } catch (error) {
                console.error('Failed to fetch search results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    if (loading) return <div>Loading...</div>;
    if (!query) return <div>Please enter a search query.</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Search Results for "{query}"</h2>
            <div>
                <h3>Users</h3>
                {results.users.length > 0 ? (
                    <ul>
                        {results.users.map(user => (
                            <li key={user.nickname}>
                                <img src={user.picture} alt={user.nickname} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                <div>{user.nickname}</div>
                                <div>{user.email}</div>
                            </li>
                        ))}
                    </ul>
                ) : <p>No users found.</p>}
                {/* The rest of your results display logic for posts, teams, leagues remains the same */}
            </div>
        </div>
    );
};

export default SearchResultsPage;
