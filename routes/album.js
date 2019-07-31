'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Playlist = require('../models/Playlist');

const spotifyApi = require('../config/credentials.js');

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId).populate('playlists');
    const data = await spotifyApi.getAlbumTracks(id);
    const newData = await spotifyApi.getAlbums([id]);
    const tracks = data.body.items;
    var myTracks = tracks;

    const albumData = newData.body.albums[0];
    // console.log(albumData.artists);
    myTracks.forEach((track) => {
      track.myPlaylist = user.playlists;
      track.albumId = albumData.id;
    });
    console.log(myTracks[0]);
    // console.log(albumData);
    user.playlists.forEach((playlist) => {
      playlist.albumId = albumData.id;
    });
    // console.log({ myTracks, albumData, user });
    res.render('album', { myTracks, albumData, user });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/addAlbum', async (req, res, next) => {
  const { id } = req.params;
  const userId = req.session.currentUser._id;

  try {
    const newUser = await User.findById(userId);
    let state = false;
    newUser.albums.forEach(async (elem) => {
      if (elem.albumId === id) {
        state = true;
        await User.findByIdAndUpdate(userId, { $pull: { albums: { albumId: id } } });
      }
    });
    if (!state) {
      await User.findByIdAndUpdate(userId, { $push: { albums: { albumId: id } } }, { new: true });
    }
    res.redirect(`/album/${id}`);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/like/:albumId', async (req, res, next) => {
  const id = req.params.id;
  const { albumId } = req.params;
  const userId = req.session.currentUser._id;

  try {
    const newUser = await User.findById(userId);
    let state = false;
    newUser.tracks.forEach(async (elem) => {
      if (elem.trackId === id) {
        state = true;
        await User.findByIdAndUpdate(userId, { $pull: { tracks: { trackId: id } } });
      }
    });
    if (!state) {
      await User.findByIdAndUpdate(userId, { $push: { tracks: { trackId: id } } }, { new: true });
    }
    res.redirect(`/album/${albumId}`);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/add/:albumId/to/:trackId/from/:artistId', async (req, res, next) => {
  const id = req.params.id;
  const artistId = req.params.artistId;
  const albumId = req.params.albumId;
  const trackId = req.params.trackId;


  try {
    await Playlist.findByIdAndUpdate(id, { $push: { tracks: { trackId: trackId, albumId: albumId, artistId: artistId } } }, { new: true });
    res.redirect(`/album/${albumId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
