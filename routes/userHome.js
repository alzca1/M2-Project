'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const spotifyApi = require('../config/credentials.js');

// const Playlist = require('../models/Playlist.js');

router.get('/', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const newUser = await User.findById(userId).populate('playlists');
  const newData = await spotifyApi.getAlbums([User.albums.albumsId]);
  console.log(newData);
  res.render('userHome', newUser, newData);
});

module.exports = router;
