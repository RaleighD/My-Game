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
  }

  try {
    const teams = await Team.find(query)
                            .populate('coach', 'name')
                            .populate('members', 'name');
    res.json({ teams }); // Sends the teams array with coach and members populated
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/allMyTeams', async (req, res) => {
  const { userId } = req.query;

  try {
    // find the MongoDB user ID that corresponds to the provided Auth0 ID
    const user = await User.findOne({ auth0Id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // find all teams where this user is a member
    const teams = await Team.find({ members: user._id })
                            .populate('coach', 'name')
                            .populate('members', 'name');
    res.json({ teams });
  } catch (error) {
    console.error('Error fetching user\'s teams:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const team = await Team.findOne({ name: name }).populate('coach members');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    console.error('Error fetching team data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/join', async (req, res) => {
  const { userId, teamId } = req.body;

  try {
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
