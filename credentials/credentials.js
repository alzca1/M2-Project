'use strict';

const SpotifyWebApi = require('spotify-web-api-node');
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });

module.exports = spotifyApi;
