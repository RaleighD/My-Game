import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
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
                // Handle error appropriately
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    if (loading) return <div>Loading...</div>;
    if (!query) return <div>Please enter a search query.</div>;

    return (
        <div>
            <h2>Search Results for "{query}"</h2>
            {/* Render search results here */}
            {/* Example: */}
            <div>
                <h3>Users</h3>
                {/* Map through results.users and display each user */}
                <h3>Posts</h3>
                {/* Map through results.posts and display each post */}
                {/* Repeat for teams and leagues */}
            </div>
        </div>
    );
};

export default SearchResults;
