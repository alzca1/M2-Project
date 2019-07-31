'use strict';

const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

const spotifyApi = require('../config/credentials.js');

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log({ id });
  try {
    const songs = await Playlist.findById(id);
    // const data = await spotifyApi.getAlbumTracks(id);
    const newData = await spotifyApi.getAlbums([id]);
    // const tracksInfo = await spotifyApi.getTracks([id]);
    // console.log(tracksInfo);
    const tracks = newData.body.items;

    res.render('playlistSongCollection', songs, tracks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
