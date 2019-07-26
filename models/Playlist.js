'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  owner:
    [{
      type: ObjectId,
      ref: 'User'
    }],
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
