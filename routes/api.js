'use strict';

const express = require('express');
const router = express.Router();

const spotifyApi = require('../credentials/credentials.js');
const Playlist = require('../models/Playlist');
const User = require('../models/User');

router.post('/playlist', /* isFormFilled, */ async (req, res, next) => {
  const { name } = req.body;
  try {
    const playlist = await Playlist.create({ name });

    const playlistId = playlist._id;
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { $push: { playlists: playlistId } });
    // const data = {
    //   messages: req.flash('errorDuplicateTitle'),
    //   recipe
    // };
    res.json(playlist);
  } catch (error) {
    next(error);
  }
});

// Tenemos problemas para renderizar esto!!!
router.post('/playlist/:id/go', /* isFormFilled, */ async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Playlist.findById(id);

    // const data = {
    //   messages: req.flash('errorDuplicateTitle'),
    //   recipe
    // };
    console.log(data);
    res.render('/playlistDetails', { data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
