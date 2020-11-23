import permissions from './permissions';

// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

// Authorize users using Spotify API first.
export const ENDPOINT = "https://accounts.spotify.com/authorize";

// Once logged in, user is redirected to Spotifyre app.
const redirectURI = "http://localhost:3000/";

// Client ID of the Spotifyre app.
const clientID = "142484a99cc54ee29b588462911e7ee4";

export const loginURL = 
  `${ENDPOINT}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${permissions.join('%20')}&response_type=token&show_dialogue=true`;
