'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const spotifyApi = require('../config/credentials.js');

// const Playlist = require('../models/Playlist.js');

router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const newUser = await User.findById(userId).populate('playlists');
    const albumsInfo = [];
    const promisesAlbums = Promise.all(newUser.albums.map(async (album) => {
      const string = album.albumId.toString();
      const albumInfo = await spotifyApi.getAlbums([string]);
      albumsInfo.push(albumInfo.body.albums[0]);
    }));

    const artistsInfo = [];
    const promisesArtists = Promise.all(newUser.artists.map(async (artist) => {
      const string = artist.artistId.toString();
      const artistInfo = await spotifyApi.getArtists([string]);
      artistsInfo.push(artistInfo.body.artists[0]);
    }));
    newUser.playlists.forEach(async (playlist) => {
      spotifyApi.getAlbum([`${playlist.tracks[0].albumId}`]).then((album) => {
        if (album.body.images) {
          playlist.image = album.body.images[0].url;
        }
      }).catch((error) => console.log(error));
    });

    const multipromise = Promise.all([promisesArtists, promisesAlbums]);

    multipromise.then(() => {
      const data = { artistsInfo, albumsInfo, newUser };

      res.render('userHome', data);
    });
  } catch (error) {
    next(error);
  }
});

// router.get('/favouriteSongs', async (req, res, next) => {
//   const user = req.session.currentUser;
//   const myUser = User.findById(user._id);

//   // const superInfoTrack = { playlist, album, trackInfo };
//   res.render('favouriteSongs', superInfoTrack);
// });

module.exports = router;
