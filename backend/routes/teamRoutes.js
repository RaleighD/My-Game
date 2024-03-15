const express = require('express');
const multer = require('multer');
const Team = require('../models/Team');

const router = express.Router(); 


const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post('/create', upload.single('picture'), async (req, res) => {
  const { name, location, sport, coach } = req.body;

  let pictureUrl = '';
  if (req.file) {
    pictureUrl = await uploadFileAndGetURL(req.file);
  }

  const existingTeam = await Team.findOne({ coach: coach });
  if (existingTeam) {
    return res.status(400).json({ message: 'User already has a team.' });
  }

  const team = new Team({
    name,
    coach,
    members: [coach],
    location,
    sport,
    picture: pictureUrl, 
  });

  try {
    await team.save();
    res.status(201).json({ message: 'Team created successfully.', team });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
