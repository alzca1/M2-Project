'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  images:
    [{
      type: String,
      default: 'https://pmctvline2.files.wordpress.com/2019/07/michael-jackson-mtv.jpg'
    }],
  tracks:
    [{
      trackId: String,
      albumId: String,
      artistId: String
    }]

});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
