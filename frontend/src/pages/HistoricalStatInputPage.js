import React, { useState } from 'react';
import YearStatFormBaseball from '../components/forms/YearStatFormBaseball';
import YearStatFormBasketball from "../components/forms/YearStatFormBasketball";

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
                <option value="baseball">Basketball</option>
            </select>

            {selectedSport === 'baseball' && <YearStatFormBaseball />}
            {selectedSport === 'basketball' && <YearStatFormBasketball />}
        </div>
    );
};

export default HistoricalStatInputPage;
