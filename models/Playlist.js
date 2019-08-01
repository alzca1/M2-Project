'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image:
    {
      type: String,
      default: '../images/default-cover.png'
    },
  tracks:
    [{
      trackId: String,
      albumId: String,
      artistId: String
    }]

});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
