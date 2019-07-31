'use strict';

const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

const spotifyApi = require('../config/credentials.js');

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.findById(id);
    const trackInfo = [];
    playlist.tracks.forEach(async (track) => {
      const album = await spotifyApi.getAlbums([track.albumId]);
      const trackIdFromPlaylist = track.trackId;
      const superTracks = album.body.albums[0];
      superTracks.tracks.items.forEach((item) => {
        if (item.id === trackIdFromPlaylist) {
          item.albumId = track.albumId;
          trackInfo.push(item);
          // console.log(trackInfo);
        }
      });
    });
    const newData = await spotifyApi.getAlbums([playlist.tracks[0].albumId]);
    const album = newData.body;
    // console.log(newData.body);
    const superInfoTrack = { playlist, album, trackInfo };
    res.render('playlistSongCollection', superInfoTrack);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
