const express = require('express');
const Joi = require('joi');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  bio: Joi.string().max(200).allow('')
});

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/profile', auth, async (req, res) => {
  try {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, bio } = req.body;

    if (username) {
      const existingUser = await User.findOne({ username, _id: { $ne: req.user.userId } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { username, bio },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
