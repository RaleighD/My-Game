import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';

const YearStatFormHockey = () => {
    const { user } = useAuth0();
    const initialFormData = {
        year: '',
        team: '',
        league: '',
        gamesPlayed: '',
        goals: '',
        assists: '',
        points: '',
        penaltyMinutes: '',
        plusMinus: '',
        shotsOnGoal: '',
        powerPlayGoals: '',
        shortHandedGoals: '',
        gameWinningGoals: '',
        saves: '', // For goalies
        savePercentage: '', // For goalies
        goalsAgainstAverage: '', // For goalies
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
        const response = await fetch(`${REACT_APP_API_URL}/api/hockey/stats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataWithID)
        });

        if (response.ok) {
            console.log('Stats submitted successfully');
            setSubmissionMessage('Stats submitted successfully!');
            setFormData(initialFormData);
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
            <input type="text" name="gamesPlayed" value={formData.gamesPlayed} onChange={handleChange} placeholder="Games Played" />
            <input type="text" name="goals" value={formData.goals} onChange={handleChange} placeholder="Goals" />
            <input type="text" name="assists" value={formData.assists} onChange={handleChange} placeholder="Assists" />
            <input type="text" name="points" value={formData.points} onChange={handleChange} placeholder="Points" />
            <input type="text" name="penaltyMinutes" value={formData.penaltyMinutes} onChange={handleChange} placeholder="Penalty Minutes" />
            <input type="text" name="plusMinus" value={formData.plusMinus} onChange={handleChange} placeholder="+/- Rating" />
            <input type="text" name="shotsOnGoal" value={formData.shotsOnGoal} onChange={handleChange} placeholder="Shots On Goal" />
            <input type="text" name="powerPlayGoals" value={formData.powerPlayGoals} onChange={handleChange} placeholder="Power Play Goals" />
            <input type="text" name="shortHandedGoals" value={formData.shortHandedGoals} onChange={handleChange} placeholder="Short Handed Goals" />
            <input type="text" name="gameWinningGoals" value={formData.gameWinningGoals} onChange={handleChange} placeholder="Game Winning Goals" />
            <input type="text" name="saves" value={formData.saves} onChange={handleChange} placeholder="Saves" />
            <input type="text" name="savePercentage" value={formData.savePercentage} onChange={handleChange} placeholder="Save Percentage" />
            <input type="text" name="goalsAgainstAverage" value={formData.goalsAgainstAverage} onChange={handleChange} placeholder="Goals Against Average" />
            <button type="submit">Submit</button>
            {submissionMessage && <p>{submissionMessage}</p>}
        </form>
    );
};

export default YearStatFormHockey;
