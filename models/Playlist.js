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
      type: String
    }],
  tracks:
    [{
      type: String
    }]

});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
