'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');

const spotifyApi = require('../config/credentials.js');

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


router.post('/:id/addArtist', async (req, res, next) => {
  const { id } = req.params;
  const userId = req.session.currentUser._id;

  try {
    const newUser = await User.findById(userId);
    let state = false;
    newUser.artists.forEach(async (elem) => {
      console.log('hola' + elem);
      if (elem.artistId === id) {
        state = true;
        await User.findByIdAndUpdate(userId, { $pull: { artists: { artistId: id } } });
      }
    });
    if (!state) {
      await User.findByIdAndUpdate(userId, { $push: { artists: { artistId: id } } }, { new: true });
    }
    res.redirect(`/artist/${id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
