'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');

const spotifyApi = require('../config/credentials.js');

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await spotifyApi.getAlbumTracks(id);
    const newData = await spotifyApi.getAlbums([id]);
    const tracks = data.body.items;

    const albumData = newData.body.albums[0];
    tracks.forEach((track) => {
      track.albumId = albumData.id;
    });
    res.render('album', { tracks, albumData });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/like/:albumId', async (req, res, next) => {
  const id = req.params.id;
  const { albumId } = req.params;
  const userId = req.session.currentUser._id;

  try {
    const newUser = await User.findById(userId);
    let state = false;
    newUser.tracks.forEach(async (elem) => {
      if (elem.trackId === id) {
        state = true;
        await User.findByIdAndUpdate(userId, { $pull: { tracks: { trackId: id } } });
      }
    });
    if (!state) {
      await User.findByIdAndUpdate(userId, { $push: { tracks: { trackId: id } } }, { new: true });
    }
    res.redirect(`/album/${albumId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
