import React, { useState } from 'react';

const yearStatFormBaseball = () => {
    const [formData, setFormData] = useState({
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
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Make an API call to your backend
        const response = await fetch('/api/baseball/stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                year: formData.year,
                tm: formData.tm,
                lg: formData.lg,
                g: formData.g,
                pa: formData.pa,
                ab: formData.ab,
                r: formData.r,
                h: formData.h,
                dbl: formData.dbl,
                tpl: formData.tpl,
                hr: formData.hr,
                rbi: formData.rbi,
                sb: formData.sb,
                cs: formData.cs,
                bb: formData.bb,
                so: formData.so,
                hbp: formData.hbp,
                sh: formData.sh,
                sf: formData.sf,
                ibb: formData.ibb
            })
        });

        if (response.ok) {
            console.log('Stats submitted successfully');
            // Handle success
        } else {
            console.error('Error submitting stats');
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year" />
            <input type="text" name="tm" value={formData.tm} onChange={handleChange} placeholder="Team" />
            <input type="text" name="lg" value={formData.lg} onChange={handleChange} placeholder="League" />
            <input type="text" name="g" value={formData.g} onChange={handleChange} placeholder="Games" />
            <input type="text" name="pa" value={formData.pa} onChange={handleChange} placeholder="Plate Appearances" />
            <input type="text" name="ab" value={formData.ab} onChange={handleChange} placeholder="At Bats" />
            <input type="text" name="r" value={formData.r} onChange={handleChange} placeholder="Runs" />
            <input type="text" name="h" value={formData.h} onChange={handleChange} placeholder="Hits" />
            <input type="text" name="dbl" value={formData.dbl} onChange={handleChange} placeholder="Doubles" />
            <input type="text" name="tpl" value={formData.tpl} onChange={handleChange} placeholder="Triples" />
            <input type="text" name="hr" value={formData.hr} onChange={handleChange} placeholder="Home Runs" />
            <input type="text" name="rbi" value={formData.rbi} onChange={handleChange} placeholder="Runs Batted In" />
            <input type="text" name="sb" value={formData.sb} onChange={handleChange} placeholder="Stolen Bases" />
            <input type="text" name="cs" value={formData.cs} onChange={handleChange} placeholder="Caught Stealing" />
            <input type="text" name="bb" value={formData.bb} onChange={handleChange} placeholder="Walks" />
            <input type="text" name="so" value={formData.so} onChange={handleChange} placeholder="Strikeouts" />
            <input type="text" name="hbp" value={formData.hbp} onChange={handleChange} placeholder="Hit By Pitch" />
            <input type="text" name="sh" value={formData.sh} onChange={handleChange} placeholder="Sacrifice Hits" />
            <input type="text" name="sf" value={formData.sf} onChange={handleChange} placeholder="Sacrifice Flies" />
            <input type="text" name="ibb" value={formData.ibb} onChange={handleChange} placeholder="Intentional Walks" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default yearStatFormBaseball
