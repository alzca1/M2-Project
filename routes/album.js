'use strict';

const express = require('express');
const router = express.Router();

const spotifyApi = require('../credentials/credentials.js');

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await spotifyApi.getAlbumTracks(id);
    const newData = await spotifyApi.getAlbums([id]);
    const tracks = data.body.items;
    const albumData = newData.body.albums[0];
    // console.log(albumData.artists);
    res.render('album', { tracks, albumData });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
