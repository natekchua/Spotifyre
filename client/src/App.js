import React, { useState, useEffect } from 'react';
import { getResponseToken } from './services/spotifyUtils';
import { useProviderValue } from './components/Context/Provider';
import SpotifyWebApi from 'spotify-web-api-js';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard'

import './App.css';

const spotify = new SpotifyWebApi();

function App() {
  const [{
    token,
    user
  }, dispatch] = useProviderValue();

  useEffect(() => {
    const hash = getResponseToken();
    window.location.hash = '';
    if (hash.access_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: hash.access_token              
      })
      spotify.setAccessToken(hash.access_token);  // Spotify API receives access token to confirm connection.
      spotify.getMe().then(user => {              // get user account (returns a promise)
        dispatch({
          type: 'SET_USER',
          user                                    // same as user: user
        })
      })
    }
  }, []);

  return (
    <div className='app'>
      {
        token
          ? <Dashboard spotify={spotify} />
          : <Login />
      }
    </div>
  );
}

export default App;
