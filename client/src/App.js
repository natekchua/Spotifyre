import React, { useState, useEffect } from 'react';
import { getResponseToken } from './services/helperFunctions';
import { useProviderValue } from './components/ContextState/Provider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { 
  getLoginURL,
  setAccessToken,
  getMe,
  getUserPlaylists,
  getPlaylist,
  getSpotify
} from './services/apiRequests';
import { getCuratorSettings } from './services/dbRequests';
import Login from './components/Login/Login';
import AppContainer from './components/AppContainer/AppContainer';

import './App.css';

const App = () => {
  const [loginURL, setLoginURL] = useState('');
  const [{
    token
  }, dispatch] = useProviderValue();

  // Retrieve user data upon authentication (initial render)
  useEffect(() => {
    getLoginURL()
      .then(res => setLoginURL(res.loginURL))
      .catch(err => console.log(err));

    const hash = getResponseToken();
    window.location.hash = '';
    if (hash.access_token) {
      // Set Access Token - Spotify API receives access token to confirm connection.
      dispatch({
        type: 'SET_TOKEN',
        token: hash.access_token
      });

      setAccessToken(hash.access_token);

      // Save spotify instance in Context State.
      getSpotify().then(res => {
        dispatch({
          type: 'SET_SPOTIFY',
          spotify: res.spotify              
        });
      })
      
      // Get User Account Details and set user in Context State.
      getMe().then(res => {
        dispatch({
          type: 'SET_USER',
          user: res.me
        })
        getCuratorSettings(res.me.id).then(res => {
          if (res) {
            const resultObj = JSON.parse(res).curator_settings;
            dispatch({
              type: 'SET_CURATION_SETTINGS',
              curationSettings: JSON.parse(resultObj)
            });
            dispatch({
              type: 'CHECK_SETTINGS',
              settingsSetByUser: true
            });
          }
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))

      

      // Get User Playlists and set user playlists in Context State.
      getUserPlaylists().then(res => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: res.playlists
        });
      }).catch(err => console.log(err))

      // "On Repeat" playlist hard-coded for now
      getPlaylist().then(res => {
        dispatch({
          type: 'SET_CURR_PLAYLIST',
          currPlaylist: res.playlist
        });
      }).catch(err => console.log(err))
    }
  }, []);

  return (
    <Router>
      {
        token
          ? <AppContainer token={token} />
          : <Route path='/' exact render={() => <Login loginURL={loginURL} />} />
      }
    </Router>
  );
}

export default App;
