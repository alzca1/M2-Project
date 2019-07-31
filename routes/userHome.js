'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
// const Playlist = require('../models/Playlist.js');

router.get('/', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const newUser = await User.findById(userId).populate('playlists').populate('artists').populate('albums').populate('tracks');

  res.render('userHome', newUser);
});

module.exports = router;
