const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TeamJoinRequest = require('../models/TeamJoinRequest');
const Team = require('../models/Team');
const User = require('../models/User');

router.post('/team-join-requests', async (req, res) => {
  const { teamId, userId } = req.body;

  try {
    const existingRequest = await TeamJoinRequest.findOne({ team: teamId, user: userId });
    if (existingRequest) {
      return res.status(409).json({ message: 'Join request already exists.' });
    }

    const newJoinRequest = new TeamJoinRequest({
      team: teamId,
      user: userId,
      status: 'pending',
    });

    await newJoinRequest.save();
    res.json({ message: 'Join request sent successfully.', joinRequest: newJoinRequest });
  } catch (error) {
    console.error('Error sending join request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/team-join-requests/:requestId/accept', async (req, res) => {
  try {
    const { requestId } = req.params;
    const updatedRequest = await TeamJoinRequest.findByIdAndUpdate(
      requestId,
      { status: 'accepted' },
      { new: true }
    );

    if (updatedRequest) {
      const team = await Team.findById(updatedRequest.team);
      if (team && !team.members.includes(updatedRequest.user)) {
        team.members.push(updatedRequest.user);
        await team.save();
      }
    }

    res.json({ message: 'Join request accepted.', joinRequest: updatedRequest, team: team });
  } catch (error) {
    console.error('Error accepting join request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/team-join-requests/:requestId/decline', async (req, res) => {
  try {
    const { requestId } = req.params;
    const updatedRequest = await TeamJoinRequest.findByIdAndUpdate(
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
