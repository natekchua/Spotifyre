const permissions = require('./permissions.js');
const SpotifyWebApi = require('spotify-web-api-node');

require('dotenv').config();

// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

// Authorize users using Spotify API first.
const ENDPOINT = 'https://accounts.spotify.com/authorize';

// Client ID, Client Secret and Redirect URI of the Spotifyre app.
const redirectURI = 'https://localhost:3000/';
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;

const loginURL = `${ENDPOINT}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${permissions.join(
  '%20'
)}&response_type=token&show_dialogue=true`;

let spotify = new SpotifyWebApi({
  clientId: clientID,
  clientSecret: clientSecret,
  redirectUri: redirectURI,
});

module.exports = {
  spotify,
  loginURL,
};
