import React, { useState } from 'react';

const YearStatFormSoccer = () => {
    const initialFormData = {
        year: '',
        team: '',
        league: '',
        appearances: '',
        goals: '',
        assists: '',
        yellowCards: '',
        redCards: '',
        shotsOnTarget: '',
        minutesPlayed: '',
        cleanSheets: '' // Primarily for goalkeepers and defenders
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
        const response = await fetch(`${REACT_APP_API_URL}/api/soccer/stats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
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
            <input type="text" name="appearances" value={formData.appearances} onChange={handleChange} placeholder="Appearances" />
            <input type="text" name="goals" value={formData.goals} onChange={handleChange} placeholder="Goals" />
            <input type="text" name="assists" value={formData.assists} onChange={handleChange} placeholder="Assists" />
            <input type="text" name="yellowCards" value={formData.yellowCards} onChange={handleChange} placeholder="Yellow Cards" />
            <input type="text" name="redCards" value={formData.redCards} onChange={handleChange} placeholder="Red Cards" />
            <input type="text" name="shotsOnTarget" value={formData.shotsOnTarget} onChange={handleChange} placeholder="Shots on Target" />
            <input type="text" name="minutesPlayed" value={formData.minutesPlayed} onChange={handleChange} placeholder="Minutes Played" />
            {/* Optional fields for detailed tracking */}
            <input type="text" name="passAccuracy" value={formData.passAccuracy} onChange={handleChange} placeholder="Pass Accuracy (%)" />
            <input type="text" name="saves" value={formData.saves} onChange={handleChange} placeholder="Saves" />
            <input type="text" name="cleanSheets" value={formData.cleanSheets} onChange={handleChange} placeholder="Clean Sheets" />
            <button type="submit">Submit</button>
            {submissionMessage && <p>{submissionMessage}</p>} {/* Display the submission message */}
        </form>
    );
};

export default YearStatFormSoccer;
