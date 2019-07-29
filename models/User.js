'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  location: {
    latitude: String,
    longitude: String,
    name: String
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: String
    // require: true
  },
  shareNetwork: {
    facebook: {
      type: String
    },
    twitter: {
      type: String
    }
  },
  followed:
    [{
      type: ObjectId,
      ref: 'User'
    }],
  followers:
    [{
      type: ObjectId,
      ref: 'User'
    }],
  artists:
    [{
      artistId: String
    }],
  albums:
    [{
      albumId: String
    }],
  tracks:
    [{
      trackId: String
    }],
  playlists:
    [{
      type: ObjectId,
      ref: 'Playlist'
    }]

});

const User = mongoose.model('User', userSchema);

module.exports = User;
