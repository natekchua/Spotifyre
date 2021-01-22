import SpotifyWebApi from 'spotify-web-api-node';

// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

// Client ID, Client Secret and Redirect URI of the Spotifyre app.
// Prod environment
const prod = {
  url: { redirectURI: 'https://spotifyre-manager.netlify.app/' }
};

// local dev environment
const dev = {
  url: { redirectURI: 'http://localhost:3000/' }
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export const spotify = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: config.url.redirectURI
});
