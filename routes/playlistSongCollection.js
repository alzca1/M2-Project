'use strict';

const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
const User = require('../models/User');

const spotifyApi = require('../config/credentials.js');

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.findById(id);
    const trackInfo = [];
    if (playlist.tracks.length === 0) {
      const error = {
        message: 'You have not added any songs yet'
      };
      const data = {
        error,
        playlist
      };
      return res.render('playlistSongCollection', data);
    }
    playlist.tracks.forEach(async (track) => {
      const album = await spotifyApi.getAlbums([track.albumId]);
      const trackIdFromPlaylist = track.trackId;
      const superTracks = album.body.albums[0];
      superTracks.tracks.items.forEach((item) => {
        if (item.id === trackIdFromPlaylist) {
          item.albumId = track.albumId;
          item.playlist = playlist;
          trackInfo.push(item);
        }
      });
    });

    const newData = await spotifyApi.getAlbums([playlist.tracks[0].albumId]);

    const album = newData.body;
    const albumCover = newData.body.albums[0].images[0].url;
    const superInfoTrack = { playlist, album, trackInfo, albumCover };
    res.render('playlistSongCollection', superInfoTrack);
  } catch (error) {
    next(error);
  }
});

router.post('/:idPlaylist/delete/:newTrackId', async (req, res, next) => {
  const idPlaylist = req.params.idPlaylist;
  const { newTrackId } = req.params;
  const userId = req.session.currentUser._id;
  try {
    const newUser = await User.findById(userId).populate('playlists');
    newUser.playlists[0].tracks.forEach(async (elem) => {
      console.log(typeof elem.trackId);
      console.log(typeof newTrackId);
      console.log(newTrackId);
      console.log(elem.trackId);
      if (elem.trackId === newTrackId) {
        await Playlist.findByIdAndUpdate(idPlaylist, { $pull: { tracks: { trackId: newTrackId } } });
      }
    });
    res.redirect(`/playlistSongCollection/${idPlaylist}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
