import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';

const YearStatFormFootball = () => {
    const { user } = useAuth0();
    const initialFormData = {
        year: '',
        team: '',
        league: '',
        gamesPlayed: '',
        passingYards: '',
        passingTouchdowns: '',
        interceptionsThrown: '',
        rushingYards: '',
        rushingTouchdowns: '',
        receptions: '',
        receivingYards: '',
        receivingTouchdowns: '',
        fumbles: '',
        sacks: '',
        interceptionsCaught: '',
        tackles: '',
        forcedFumbles: '',
        fumbleRecoveries: '',
        defensiveTouchdowns: ''
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
        const response = await fetch(`${REACT_APP_API_URL}/api/football/stats`, {
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
            <input type="text" name="passingYards" value={formData.passingYards} onChange={handleChange} placeholder="Passing Yards" />
            <input type="text" name="passingTouchdowns" value={formData.passingTouchdowns} onChange={handleChange} placeholder="Passing Touchdowns" />
            <input type="text" name="interceptionsThrown" value={formData.interceptionsThrown} onChange={handleChange} placeholder="Interceptions Thrown" />
            <input type="text" name="rushingYards" value={formData.rushingYards} onChange={handleChange} placeholder="Rushing Yards" />
            <input type="text" name="rushingTouchdowns" value={formData.rushingTouchdowns} onChange={handleChange} placeholder="Rushing Touchdowns" />
            <input type="text" name="receptions" value={formData.receptions} onChange={handleChange} placeholder="Receptions" />
            <input type="text" name="receivingYards" value={formData.receivingYards} onChange={handleChange} placeholder="Receiving Yards" />
            <input type="text" name="receivingTouchdowns" value={formData.receivingTouchdowns} onChange={handleChange} placeholder="Receiving Touchdowns" />
            <input type="text" name="fumbles" value={formData.fumbles} onChange={handleChange} placeholder="Fumbles" />
            <input type="text" name="sacks" value={formData.sacks} onChange={handleChange} placeholder="Sacks" />
            <input type="text" name="interceptionsCaught" value={formData.interceptionsCaught} onChange={handleChange} placeholder="Interceptions Caught" />
            <input type="text" name="tackles" value={formData.tackles} onChange={handleChange} placeholder="Tackles" />
            <input type="text" name="forcedFumbles" value={formData.forcedFumbles} onChange={handleChange} placeholder="Forced Fumbles" />
            <input type="text" name="fumbleRecoveries" value={formData.fumbleRecoveries} onChange={handleChange} placeholder="Fumble Recoveries" />
            <input type="text" name="defensiveTouchdowns" value={formData.defensiveTouchdowns} onChange={handleChange} placeholder="Defensive Touchdowns" />
            <button type="submit">Submit</button>
            {submissionMessage && <p>{submissionMessage}</p>} {/* Display the submission message */}
        </form>
    );
};

export default YearStatFormFootball;
