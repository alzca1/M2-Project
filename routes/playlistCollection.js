'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId).populate('playlists');
    res.render('playlistCollection', user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
