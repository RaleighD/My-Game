import React, { useState } from 'react';

const YearStatFormGolf = () => {
    const initialFormData = {
        year: '',
        numberOfRounds: '',
        averageScore: '',
        bestScore: '',
        birdies: '',
        eagles: '',
        pars: '',
        bogeys: '',
        doubleBogeysOrWorse: '',
        handicap: '',
        averagePuttsPerRound: '',
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
        const response = await fetch(`${REACT_APP_API_URL}/api/golf/stats`, {
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
            <input type="text" name="numberOfRounds" value={formData.numberOfRounds} onChange={handleChange} placeholder="Number of Rounds" />
            <input type="text" name="averageScore" value={formData.averageScore} onChange={handleChange} placeholder="Average Score" />
            <input type="text" name="bestScore" value={formData.bestScore} onChange={handleChange} placeholder="Best Score" />
            <input type="text" name="birdies" value={formData.birdies} onChange={handleChange} placeholder="Birdies" />
            <input type="text" name="eagles" value={formData.eagles} onChange={handleChange} placeholder="Eagles" />
            <input type="text" name="pars" value={formData.pars} onChange={handleChange} placeholder="Pars" />
            <input type="text" name="bogeys" value={formData.bogeys} onChange={handleChange} placeholder="Bogeys" />
            <input type="text" name="doubleBogeysOrWorse" value={formData.doubleBogeysOrWorse} onChange={handleChange} placeholder="Double Bogeys or Worse" />
            <input type="text" name="handicap" value={formData.handicap} onChange={handleChange} placeholder="Handicap" />
            <input type="text" name="greensInRegulation" value={formData.greensInRegulation} onChange={handleChange} placeholder="Greens in Regulation (%)" />
            <input type="text" name="drivingAccuracy" value={formData.drivingAccuracy} onChange={handleChange} placeholder="Driving Accuracy (%)" />
            <input type="text" name="averagePuttsPerRound" value={formData.averagePuttsPerRound} onChange={handleChange} placeholder="Average Putts Per Round" />
            <button type="submit">Submit</button>
            {submissionMessage && <p>{submissionMessage}</p>}
        </form>
    );
};

export default YearStatFormGolf;
