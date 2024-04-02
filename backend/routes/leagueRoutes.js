const express = require('express');
const League = require('../models/League');
const User = require('../models/User');
const Team = require('../models/Team');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, organizerAuth0Id, teamIds } = req.body; 
  
  try {
    const organizer = await User.findOne({ auth0Id: organizerAuth0Id });
    if (!organizer) {
      return res.status(404).json({ message: 'Organizer user not found.' });
    }

    const teamsCount = await Team.countDocuments({ _id: { $in: teamIds } });
    if (teamsCount !== teamIds.length) {
      return res.status(400).json({ message: 'One or more teams not found.' });
    }

    const league = new League({
      name,
      organizer: organizer._id,
      teams: teamIds, 
     
    });

    await league.save();
    res.status(201).json({ message: 'League created successfully.', league });

  } catch (error) {
    console.error('Error creating league:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});
router.get('/myleagues', async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findOne({ auth0Id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const leagues = await League.find({ organizer: user._id }).populate('teams');
    if (!leagues) {
      return res.status(404).json({ message: 'No leagues found for this user.' });
    }

    res.status(200).json({ leagues });
  } catch (error) {
    console.error('Error fetching leagues:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});
module.exports = router;

