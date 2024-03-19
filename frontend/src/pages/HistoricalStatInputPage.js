import React, { useState } from 'react';
import YearStatFormBaseball from '../components/forms/YearStatFormBaseball';
import YearStatFormBasketball from "../components/forms/YearStatFormBasketball";
import YearStatFormFootball from "../components/forms/YearStatFormFootball";
import YearStatFormHockey from "../components/forms/YearStatFormHockey";
import YearStatFormSoccer from "../components/forms/YearStatFormSoccer";
import YearStatFormGolf from "../components/forms/YearStatFormGolf";

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
                <option value="basketball">Basketball</option>
                <option value="football">Football</option>
                <option value="golf">Golf</option>
                <option value="hockey">Hockey</option>
                <option value="soccer">Soccer</option>
            </select>

            {selectedSport === 'baseball' && <YearStatFormBaseball />}
            {selectedSport === 'basketball' && <YearStatFormBasketball />}
            {selectedSport === 'football' && <YearStatFormFootball />}
            {selectedSport === 'golf' && <YearStatFormGolf />}
            {selectedSport === 'hockey' && <YearStatFormHockey />}
            {selectedSport === 'soccer' && <YearStatFormSoccer />}

        </div>
    );
};

export default HistoricalStatInputPage;
