import React, { useState, useEffect } from 'react';
import { getResponseToken } from './services/spotifyUtils';
import { useProviderValue } from './components/ContextState/Provider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getLoginURL } from './services/apiRequests';

import SpotifyWebApi from 'spotify-web-api-js';
import Login from './components/Login/Login';
import AppContainer from './components/AppContainer/AppContainer';

import './App.css';

const spotify = new SpotifyWebApi();

const App = () => {
  const [loginURL, setLoginURL] = useState('');
  const [{
    token
  }, dispatch] = useProviderValue();

  // Retrieve user data upon authentication (initial render)
  useEffect(() => {
    getLoginURL().then(res => setLoginURL(res.loginURL))
    .catch(err => console.log(err));

    const hash = getResponseToken();
    window.location.hash = '';
    if (hash.access_token) {
      // Set Access Token - Spotify API receives access token to confirm connection.
      dispatch({
        type: 'SET_TOKEN',
        token: hash.access_token
      })
      spotify.setAccessToken(hash.access_token);
      
      // Save spotify instance in Context State.
      dispatch({
        type: 'SET_SPOTIFY',
        spotify: spotify              
      })

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
    <Router>
      {
        token
          ? <AppContainer spotify={spotify} />
          : <Route path='/' exact render={() => <Login loginURL={loginURL} />} />
      }
    </Router>
  );
}

export default App;
