import React, { useState } from 'react';

const YearStatFormBaseball = () => {
    // Initial form state
    const initialFormData = {
        year: '',
        tm: '',
        lg: '',
        g: '',
        pa: '',
        ab: '',
        r: '',
        h: '',
        dbl: '',
        tpl: '',
        hr: '',
        rbi: '',
        sb: '',
        cs: '',
        bb: '',
        so: '',
        hbp: '',
        sh: '',
        sf: '',
        ibb: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [submissionMessage, setSubmissionMessage] = useState(''); // To store the submission feedback message

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/baseball/stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            console.log('Stats submitted successfully');
            setFormData(initialFormData); // Reset the form to its initial state
            setSubmissionMessage('Stats submitted successfully!'); // Set a success message to display to the user
            // Optionally, clear the message after some time
            setTimeout(() => setSubmissionMessage(''), 5000);
        } else {
            console.error('Error submitting stats');
            setSubmissionMessage('Failed to submit stats. Please try again.'); // Set an error message
            // Optionally, clear the message after some time
            setTimeout(() => setSubmissionMessage(''), 5000);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form inputs remain the same */}
            <button type="submit">Submit</button>
            {submissionMessage && <p>{submissionMessage}</p>} {/* Display the submission message */}
        </form>
    );
};

export default YearStatFormBaseball;
