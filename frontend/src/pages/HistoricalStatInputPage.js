import React, { useState } from 'react';
import YearStatFormBaseball from '../components/forms/YearStatFormBaseball'; // Adjust the import path as necessary

const HistoricalStatInputPage = () => {
    const [selectedSport, setSelectedSport] = useState('');

    const handleSportChange = (e) => {
        setSelectedSport(e.target.value);
    };

    return (
        <div>
            <h2>Historical Stat Input</h2>
            <select value={selectedSport} onChange={handleSportChange}>
                <option value="">Select a sport</option>
                <option value="baseball">Baseball</option>
                {/* Future sports options can be added here */}
            </select>

            {selectedSport === 'baseball' && <YearStatFormBaseball />}
            {/* Future conditional rendering for other sports' forms */}
        </div>
    );
};

export default HistoricalStatInputPage;
