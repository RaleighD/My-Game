const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const LeagueJoinRequest = require('../models/LeagueJoinRequest');
const League = require('../models/League');
const Team = require('../models/Team');

router.post('/league-join-requests', async (req, res) => {
  const { leagueId, teamId } = req.body;

  try {
    const existingRequest = await LeagueJoinRequest.findOne({ league: leagueId, team: teamId });
    if (existingRequest) {
      return res.status(409).json({ message: 'Join request already exists.' });
    }

    const newJoinRequest = new LeagueJoinRequest({
      league: leagueId,
      team: teamId,
      status: 'pending',
    });

    await newJoinRequest.save();
    res.json({ message: 'Join request sent successfully.', joinRequest: newJoinRequest });
  } catch (error) {
    console.error('Error sending join request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/league-join-requests/:requestId/accept', async (req, res) => {
  try {
    const { requestId } = req.params;
    const updatedRequest = await LeagueJoinRequest.findByIdAndUpdate(
      requestId,
      { status: 'accepted' },
      { new: true }
    );

    if (updatedRequest) {
      const league = await League.findById(updatedRequest.league);
      if (league && !league.teams.includes(updatedRequest.team)) {
        league.teams.push(updatedRequest.team);
        await league.save();
      }
    }

    res.json({ message: 'Join request accepted.', joinRequest: updatedRequest, league: league });
  } catch (error) {
    console.error('Error accepting join request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/decline-request/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;
    const updatedRequest = await LeagueJoinRequest.findByIdAndUpdate(
      requestId,
      { status: 'rejected' },
      { new: true }
    );
    res.json({ message: 'Join request declined.', joinRequest: updatedRequest });
  } catch (error) {
    console.error('Error declining join request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
