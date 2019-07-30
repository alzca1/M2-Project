'use strict';

const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const songs = await Playlist.findById(id);
    res.render('playlistSongCollection', songs);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
