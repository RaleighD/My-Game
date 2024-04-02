import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResultsPage.css'; // Assuming you have a CSS file for styles

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResultsPage = () => {
    const query = useQuery();
    const searchTerm = query.get("query");
    const [results, setResults] = useState([]);

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
            {results.length > 0 ? (
                results.map(user => (
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
        </div>
    );
};

export default SearchResultsPage;
