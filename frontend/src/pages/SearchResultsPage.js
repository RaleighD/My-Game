import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Helper function to parse the query string
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
    const query = useQuery();
    const searchTerm = query.get("query");
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Assuming you have a function to fetch data (e.g., from your backend API)
        // Adjust the URL/path according to your actual API endpoint
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/search?query=${searchTerm}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setResults(data); // Assuming the API returns an array of user objects
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchData();
    }, [searchTerm]);

    return (
        <div>
            {results.length > 0 ? (
                results.map(user => (
                    <div key={user._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <img src={user.picture} alt={user.nickname} style={{ marginRight: '10px', borderRadius: '50%', width: '50px', height: '50px' }} />
                        <div>{user.nickname}</div>
                    </div>
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default SearchResultsPage;
