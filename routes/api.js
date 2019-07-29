'use strict';

const express = require('express');
const router = express.Router();

// const spotifyApi = require('../credentials/credentials.js');
const Playlist = require('../models/Playlist');
const User = require('../models/User');

router.post('/playlist', /* isFormFilled, */ async (req, res, next) => {
  const { name } = req.body;
  try {
    const user = req.session.currentUser;
    const newUser = await User.findById(user._id).populate('playlists');
    newUser.playlists.forEach((elem) => {
      if (elem.name === name) {
        console.log(elem.name);
        return res.json({ message: 'Playlist name already exists' });
      }
    });

    const playlist = await Playlist.create({ name });

    const playlistId = playlist._id;
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { $push: { playlists: playlistId } }, { new: true });
    // const data = {
    //   messages: req.flash('errorDuplicateTitle'),
    //   recipe
    // };
    res.json(playlist);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
