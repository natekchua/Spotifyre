const SpotifyWebApi = require('spotify-web-api-node')

require('dotenv').config()

// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

// Client ID, Client Secret and Redirect URI of the Spotifyre app.
// const redirectURI = 'https://spotifyre-manager.netlify.app/';
const redirectURI = 'http://localhost:3000/' // local dev environment
const clientID = process.env.clientID
const clientSecret = process.env.clientSecret

const spotify = new SpotifyWebApi({
  clientId: clientID,
  clientSecret: clientSecret,
  redirectUri: redirectURI
})

module.exports = { spotify }
