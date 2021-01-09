import SpotifyWebApi from 'spotify-web-api-node';
import * as dotenv from 'dotenv';

// TODO: check if this is required here
dotenv.config();

// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

// Client ID, Client Secret and Redirect URI of the Spotifyre app.
// Prod environment
const prod = {
  url: { redirectURI: 'https://spotifyre-manager.netlify.app/' },
};

// local dev environment
const dev = {
  url: { redirectURI: 'http://localhost:3000/' },
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;

export const spotify = new SpotifyWebApi({
  clientId: clientID,
  clientSecret: clientSecret,
  redirectUri: config.url.redirectURI,
});
