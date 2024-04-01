const express = require('express');
const Team = require('../models/Team');
const User = require('../models/User'); 
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, location, sport, coachAuth0Id } = req.body;
  
  try {
    const user = await User.findOne({ auth0Id: coachAuth0Id });
    if (!user) {
      return res.status(404).json({ message: 'Coach user not found.' });
    }

    const existingTeam = await Team.findOne({ coach: user._id });
    if (existingTeam) {
      return res.status(400).json({ message: 'User already has a team.' });
    }
    
    const team = new Team({
      name,
      coach: user._id, 
      members: [user._id], 
      location,
      sport,
    });

    await team.save();
    res.status(201).json({ message: 'Team created successfully.', team });

  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
