const express = require('express');
const Team = require('../models/Team');
const User = require('../models/User'); 
const router = express.Router();

router.post('/create', async (req, res) => {
  const { name, location, sport, coachAuth0Id } = req.body;
  try {
    const user = await User.findOne({ auth0Id: coachAuth0Id });
    if (!user) {
      return res.status(404).json({ message: 'Coach user not found.' });
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

router.get('/all', async (req, res) => {
  const { searchQuery, filter } = req.query;
  let query = {};
  if (filter && searchQuery) {
    query[filter] = { $regex: searchQuery, $options: 'i' };
  } else {
    
  }

  try {
    const teams = await Team.find(query).populate('coach', 'name').populate('members', 'name');
    res.json({ teams: teams }); // Wrap the teams array in an object with a 'teams' property
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/join', async (req, res) => {
  const { userId, teamId } = req.body;

  try {
    // Directly use the userId from the request, assuming it's already the MongoDB Object ID
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { members: userId } }, // Prevents adding duplicates
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found.' });
    }

    res.status(200).json({ message: 'User added to the team successfully', team: updatedTeam });
  } catch (error) {
    console.error('Error adding user to team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
