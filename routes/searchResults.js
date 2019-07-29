'use strict';

const express = require('express');
const router = express.Router();

const spotifyApi = require('../config/credentials.js');

router.get('/', async (req, res, next) => {
  const artist = req.query.artist;
  try {
    const data = await spotifyApi.searchArtists(artist);
    const artists = data.body.artists.items;
    res.render('searchResults', { artist, artists });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
