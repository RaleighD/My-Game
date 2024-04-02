import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';

const YearStatFormBaseball = () => {
    const { user } = useAuth0();
    const initialFormData = {
        year: '',
        team: '',
        league: '',
        games: '',
        plateAppearances: '',
        atBats: '',
        runs: '',
        hits: '',
        doubles: '',
        triples: '',
        homeRuns: '',
        runsBattedIn: '',
        stolenBases: '',
        caughtStealing: '',
        walks: '',
        strikeouts: '',
        hitByPitch: '',
        sacrificeHits: '',
        sacrificeFlies: '',
        intentionalWalks: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        const { REACT_APP_API_URL } = process.env;
        e.preventDefault();
        const dataWithID = { ...formData, userID: user.sub};
        const response = await fetch(`${REACT_APP_API_URL}/api/baseball/stats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataWithID)
        });

        if (response.ok) {
            console.log('Stats submitted successfully');
            setSubmissionMessage('Stats submitted successfully!');

        } else {
            console.error('Error submitting stats');
            setSubmissionMessage('Failed to submit stats. Please try again.');
            setTimeout(() => setSubmissionMessage(''), 5000);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year" />
            <input type="text" name="team" value={formData.team} onChange={handleChange} placeholder="Team" />
            <input type="text" name="league" value={formData.league} onChange={handleChange} placeholder="League" />
            <input type="text" name="games" value={formData.games} onChange={handleChange} placeholder="Games" />
            <input type="text" name="plateAppearances" value={formData.plateAppearances} onChange={handleChange} placeholder="Plate Appearances" />
            <input type="text" name="atBats" value={formData.atBats} onChange={handleChange} placeholder="At Bats" />
            <input type="text" name="runs" value={formData.runs} onChange={handleChange} placeholder="Runs" />
            <input type="text" name="hits" value={formData.hits} onChange={handleChange} placeholder="Hits" />
            <input type="text" name="doubles" value={formData.doubles} onChange={handleChange} placeholder="Doubles" />
            <input type="text" name="triples" value={formData.triples} onChange={handleChange} placeholder="Triples" />
            <input type="text" name="homeRuns" value={formData.homeRuns} onChange={handleChange} placeholder="Home Runs" />
            <input type="text" name="runsBattedIn" value={formData.runsBattedIn} onChange={handleChange} placeholder="Runs Batted In" />
            <input type="text" name="stolenBases" value={formData.stolenBases} onChange={handleChange} placeholder="Stolen Bases" />
            <input type="text" name="caughtStealing" value={formData.caughtStealing} onChange={handleChange} placeholder="Caught Stealing" />
            <input type="text" name="walks" value={formData.walks} onChange={handleChange} placeholder="Walks" />
            <input type="text" name="strikeouts" value={formData.strikeouts} onChange={handleChange} placeholder="Strikeouts" />
            <input type="text" name="hitByPitch" value={formData.hitByPitch} onChange={handleChange} placeholder="Hit By Pitch" />
            <input type="text" name="sacrificeHits" value={formData.sacrificeHits} onChange={handleChange} placeholder="Sacrifice Hits" />
            <input type="text" name="sacrificeFlies" value={formData.sacrificeFlies} onChange={handleChange} placeholder="Sacrifice Flies" />
            <input type="text" name="intentionalWalks" value={formData.intentionalWalks} onChange={handleChange} placeholder="Intentional Walks" />
            <button type="submit">Submit</button>
            {submissionMessage && <p>{submissionMessage}</p>}
        </form>
    );
};

export default YearStatFormBaseball;
