'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
// const Playlist = require('../models/Playlist.js');

router.get('/', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const user = await User.findById(userId).populate('playlists'); // con populate mongoose busca todas las recetas relacionadas con el user y las trae

  res.render('userHome', user);
});

module.exports = router;
