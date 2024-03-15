import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';

const YearStatFormBasketball = () => {
    const { user } = useAuth0();
    const initialFormData = {
        year: '',
        team: '',
        league: '',
        gamesPlayed: '',
        points: '',
        assists: '',
        rebounds: '',
        steals: '',
        blocks: '',
        turnovers: '',
        personalFouls: '',
        fieldGoalsMade: '',
        fieldGoalsAttempted: '',
        threePointFieldGoalsMade: '',
        threePointFieldGoalsAttempted: '',
        freeThrowsMade: '',
        freeThrowsAttempted: ''
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
        const response = await fetch(`${REACT_APP_API_URL}/api/basketball/stats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataWithID)
        });

        if (response.ok) {
            console.log('Stats submitted successfully');
            setSubmissionMessage('Stats submitted successfully!'); // Set a success message to display to the user
            // Optionally, clear the form
            setFormData(initialFormData);
        } else {
            console.error('Error submitting stats');
            setSubmissionMessage('Failed to submit stats. Please try again.'); // Set an error message
            // Optionally, clear the message after some time
            setTimeout(() => setSubmissionMessage(''), 5000);

        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year" />
            <input type="text" name="team" value={formData.team} onChange={handleChange} placeholder="Team" />
            <input type="text" name="league" value={formData.league} onChange={handleChange} placeholder="League" />
            <input type="text" name="gamesPlayed" value={formData.gamesPlayed} onChange={handleChange} placeholder="Games Played" />
            <input type="text" name="points" value={formData.points} onChange={handleChange} placeholder="Points" />
            <input type="text" name="assists" value={formData.assists} onChange={handleChange} placeholder="Assists" />
            <input type="text" name="rebounds" value={formData.rebounds} onChange={handleChange} placeholder="Rebounds" />
            <input type="text" name="steals" value={formData.steals} onChange={handleChange} placeholder="Steals" />
            <input type="text" name="blocks" value={formData.blocks} onChange={handleChange} placeholder="Blocks" />
            <input type="text" name="turnovers" value={formData.turnovers} onChange={handleChange} placeholder="Turnovers" />
            <input type="text" name="personalFouls" value={formData.personalFouls} onChange={handleChange} placeholder="Personal Fouls" />
            <input type="text" name="fieldGoalsMade" value={formData.fieldGoalsMade} onChange={handleChange} placeholder="Field Goals Made" />
            <input type="text" name="fieldGoalsAttempted" value={formData.fieldGoalsAttempted} onChange={handleChange} placeholder="Field Goals Attempted" />
            <input type="text" name="threePointFieldGoalsMade" value={formData.threePointFieldGoalsMade} onChange={handleChange} placeholder="Three-Point Field Goals Made" />
            <input type="text" name="threePointFieldGoalsAttempted" value={formData.threePointFieldGoalsAttempted} onChange={handleChange} placeholder="Three-Point Field Goals Attempted" />
            <input type="text" name="freeThrowsMade" value={formData.freeThrowsMade} onChange={handleChange} placeholder="Free Throws Made" />
            <input type="text" name="freeThrowsAttempted" value={formData.freeThrowsAttempted} onChange={handleChange} placeholder="Free Throws Attempted" />
            <button type="submit">Submit</button>
            {submissionMessage && <p>{submissionMessage}</p>} {/* Display the submission message */}
        </form>
    );
};

export default YearStatFormBasketball;
