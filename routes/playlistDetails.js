'use strict';

const express = require('express');
const router = express.Router();
// const Playlist = require('../models/Playlist');
const User = require('../models/User');
// const spotifyApi = require('../config/credentials.js');

// router.get('/:id', async (req, res, next) => {
//   const playlistId = req.params;
//   try {
//     const data = await User.findById(artist);
//     const artists = data.body.artists.items;
//     res.render('searchResults', { artist, artists });
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const playlistId = User.playlists._id;
    const data = await playlistId.findOneById(id);
    res.render('/playlistDetails', { data });
    // res.render('playlist');
  } catch (error) {
    next(error);
  }
});

module.exports = router;

