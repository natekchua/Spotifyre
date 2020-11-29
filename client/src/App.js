import React, { useEffect } from 'react';
import { getResponseToken } from './services/spotifyUtils';
import { useProviderValue } from './components/ContextState/Provider';
import SpotifyWebApi from 'spotify-web-api-js';
import Login from './components/Login/Login';
import AppContainer from './components/AppContainer/AppContainer'

import './App.css';

const spotify = new SpotifyWebApi();

function App() {
  const [{
    token
  }, dispatch] = useProviderValue();

  // Retrieve user data upon authentication (initial render)
  useEffect(() => {
    const hash = getResponseToken();
    window.location.hash = '';
    if (hash.access_token) {

      // Set Access Token - Spotify API receives access token to confirm connection.
      dispatch({
        type: 'SET_TOKEN',
        token: hash.access_token
      })
      spotify.setAccessToken(hash.access_token);

      // Get User Account Details and set user in Context State.
      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        })
      });

      // Get User Playlists and set user playlists in Context State.
      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        })
      });

      // "On Repeat" playlist hard-coded for now
      spotify.getPlaylist('37i9dQZF1EpmFBY9P2HI7S').then(playlist => {
        dispatch({
          type: 'SET_CURR_PLAYLIST',
          currPlaylist: playlist
        })
      });

    }
  }, []);

  return (
    <div className='app'>
      {
        token
          ? <AppContainer spotify={spotify} />
          : <Login />
      }
    </div>
  );
}

export default App;
