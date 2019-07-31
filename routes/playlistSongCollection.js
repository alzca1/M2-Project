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
    playlist.tracks.forEach(async (track) => {
      const album = await spotifyApi.getAlbums([track.albumId]);
      const trackIdFromPlaylist = track.trackId;
      const superTracks = album.body.albums[0];
      superTracks.tracks.items.forEach((item) => {
        if (item.id === trackIdFromPlaylist) {
          item.albumId = track.albumId;
          item.playlist = playlist;
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

router.post('/:idPlaylist/delete/:newTrackId', async (req, res, next) => {
  const { idPlaylist } = req.params;
  const { newTrackId } = req.params;
  const userId = req.session.currentUser._id;
  try {
    const newUser = await User.findById(userId).populate('playlists');
    newUser.playlists[0].tracks.forEach(async (elem) => {
      console.log(elem);
      if (elem.trackId === newTrackId) {
        await Playlist.findByIdAndUpdate(idPlaylist, { $pull: { tracks: { trackId: newTrackId } } });
      }
    });
    // console.log('heyheyhye');
    const playlist = await Playlist.findById(idPlaylist);
    const trackInfo = [];
    playlist.tracks.forEach(async (track) => {
      const album = await spotifyApi.getAlbums([track.albumId]);
      const trackIdFromPlaylist = track.trackId;
      const superTracks = album.body.albums[0];
      superTracks.tracks.items.forEach((item) => {
        if (item.id === trackIdFromPlaylist) {
          item.albumId = track.albumId;
          item.playlist = playlist;
          trackInfo.push(item);
          // console.log(trackInfo);
        }
      });
    });
    const newData = await spotifyApi.getAlbums([playlist.tracks[0].albumId]);
    const album = newData.body;
    // console.log(newData.body);
    const superInfoTrack = { playlist, album, trackInfo };
    res.redirect(`/playlistSongCollection/${idPlaylist}`, superInfoTrack);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
