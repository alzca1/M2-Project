'use strict';

const express = require('express');
const router = express.Router();

const spotifyApi = require('./credentials');

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await spotifyApi.getArtistAlbums(id);
    const albums = data.body.items;
    res.render('albumsList', { albums });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
