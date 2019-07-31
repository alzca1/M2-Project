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
    myTracks.forEach((track) => {
      track.myPlaylist = user.playlists;
      track.albumId = albumData.id;
    });
    // console.log(albumData);
    user.playlists.forEach((playlist) => {
      playlist.albumId = albumData.id;
    });
    res.render('album', { myTracks, albumData, user });
  } catch (error) {
    next(error);
  }
});

// router.post('/:albumId/addAlbum', async (req, res, next) => {
//   const { id } = req.params;
//   const userId = req.session.currentUser._id;

//   try {
//     const newUser = await User.findById(userId);
//     let state = false;
//     newUser.albums.forEach(async (elem) => {
//       if (elem.albumId === id) {
//         state = true;
//         await User.findByIdAndUpdate(userId, { $pull: { albumss: { albumId: id } } });
//       }
//     });
//     if (!state) {
//       await User.findByIdAndUpdate(userId, { $push: { albums: { albumId: id } } }, { new: true });
//     }
//     res.redirect(`/album/${id}`);
//   } catch (error) {
//     next(error);
//   }
// });

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

router.post('/:id/add/:albumId/to/:songId', async (req, res, next) => {
  const id = req.params.id;
  const albumId = req.params.albumId;
  const songId = req.params.songId;
  try {
    await Playlist.findByIdAndUpdate(id, { $push: { tracks: { trackId: songId } } }, { new: true });
    res.redirect(`/album/${albumId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
