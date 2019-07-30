'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');

const spotifyApi = require('../config/credentials.js');

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await spotifyApi.getAlbumTracks(id);
    // console.log(data.body);
    const newData = await spotifyApi.getAlbums([id]);
    // console.log(newData.body);
    const tracks = data.body.items;

    const albumData = newData.body.albums[0];
    // tracks.albumId = albumData.id;
    tracks.forEach((track) => {
      track.albumId = albumData.id;
    });
    console.log(tracks);
    // console.log(albumData);
    res.render('album', { tracks, albumData });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/like/:albumId', async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const { albumId } = req.params;
  const userId = req.session.currentUser._id;

  try {
    const album = await spotifyApi.getAlbums([id]);
    // console.log(song.body);

    await User.findByIdAndUpdate(userId, { $push: { tracks: { trackId: id } } }, { new: true });
    res.redirect(`/album/${albumId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
