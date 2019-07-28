'use strict';

const express = require('express');
const router = express.Router();

const spotifyApi = require('../credentials/credentials.js');

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const data = await spotifyApi.getArtistAlbums(id);
    const artistData = await spotifyApi.getArtist(id);
    // const years = [];
    // const getYears = data.body.items.forEach((info) => {
    //   const year = info.release_date.split('-').slice(0, 1).toString();
    //   years.push(year);
    // });
    // console.log(data.body.items);
    const infoArtist = artistData.body;
    const albums = data.body.items;

    res.render('artist', { albums, infoArtist });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
