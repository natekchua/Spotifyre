import React, { useState, useEffect } from 'react';
import { getResponseToken } from './services/helperFunctions';
import { useProviderValue } from './components/ContextState/Provider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { 
  getLoginURL,
  getMe,
  getUserPlaylists,
  getPlaylist
} from './services/apiRequests';
import { getSettings } from './services/dbRequests';
import Login from './components/Login/Login';
import AppContainer from './components/AppContainer/AppContainer';

import './App.css';

const App = () => {
  const [loginURL, setLoginURL] = useState('');
  const [{ token }, dispatch] = useProviderValue();

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

      // Get User Account Details and set user in Context State.
      getMe(hash.access_token).then(res => {
        const me = JSON.parse(res).me;
        dispatch({
          type: 'SET_USER',
          user: me
        })

        getSettings(me.id).then(res => {
          if (JSON.parse(JSON.parse(res).curator_settings)) {
            const resultObj = JSON.parse(res).curator_settings;
            dispatch({
              type: 'SET_USER_SETTINGS',
              userSettings: JSON.parse(resultObj)
            });
            dispatch({
              type: 'CHECK_USER_SETTINGS',
              settingsSetByUser: true
            });
          }
        }).catch(err => errorHandler(err));

        // Get User Playlists and set user playlists in Context State.
        getUserPlaylists(me.id).then(res => {
          dispatch({
            type: 'SET_PLAYLISTS',
            playlists: res.playlists
          });
        }).catch(err => errorHandler(err));
  
        // Top tracks of 2020 playlist hard-coded for now
        getPlaylist(me.id).then(res => {
          dispatch({
            type: 'SET_CURR_PLAYLIST',
            currPlaylist: res.playlist
          });
        }).catch(err => errorHandler(err));

      }).catch(err => errorHandler(err));

    }
  }, []);

  const errorHandler = (err) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: `Oops! ${err}`,
        type: 'error'
      }
    });
  }

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
