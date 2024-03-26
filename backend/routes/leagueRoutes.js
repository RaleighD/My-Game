const express = require('express');
const router = express.Router();
const League = require('../models/League');
const Game = require('../models/Game');
const Team = require('../models/Team'); 

router.post('/leagues', async (req, res) => {
  const { name, organizer, sport, teams } = req.body; 
  try {
    const newLeague = new League({
      name,
      organizer,
      sport, 
      teams, 
    });
    await newLeague.save();
    res.status(201).json({ message: 'League created successfully.', league: newLeague });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

router.get('/:leagueId', async (req, res) => {
  try {
    const league = await League.findById(req.params.leagueId)
                               .populate('teams', 'name')
                               .populate('organizer', 'name') 
                               .populate({
                                 path: 'games',
                                 select: 'title date time scores status', 
                                 populate: { path: 'teams', select: 'name' } 
                               });
    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }
    res.json(league);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

router.put('/:leagueId', async (req, res) => {
  try {
    const { teams, ...updateData } = req.body;
    const updatedLeague = await League.findByIdAndUpdate(req.params.leagueId, updateData, { new: true });
    res.json({ message: 'League updated successfully.', league: updatedLeague });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

router.delete('/:leagueId', async (req, res) => {
  try {
    const league = await League.findByIdAndDelete(req.params.leagueId);
    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }
    res.json({ message: 'League successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
