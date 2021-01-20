import React, { useState, useEffect } from 'react';
import { getCode } from './services/helperFunctions';
import { useProviderValue } from './components/ContextState/Provider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getAuthURL, getToken } from './services/apiRequests';
import Login from './components/Login/Login';
import AppContainer from './components/AppContainer/AppContainer';

import './App.css';

function App () {
  const [loginURL, setLoginURL] = useState('');
  const [{ token }, dispatch] = useProviderValue();

  useEffect(() => {
    async function cb () {
      try {
        if (localStorage.getItem('SPOTIFY_ACCESS_TOKEN')) {
          console.log('access token')
          dispatch({
            type: 'SET_TOKEN',
            token: localStorage.getItem('SPOTIFY_ACCESS_TOKEN')
          });
        } else {
          const authURL = await getAuthURL();
          setLoginURL(authURL.loginURL);

          const code = getCode();
          if (code) {
            const token = await getToken(code);
            const json = JSON.parse(token);
            localStorage.setItem('SPOTIFY_ACCESS_TOKEN', json.tokens.accessToken);
            dispatch({
              type: 'SET_TOKEN',
              token: json.tokens.accessToken
            });
          }
        }
      } catch (err) {
        errorHandler(err);
        console.error(err);
      }
    }

    cb();
  }, []);

  const errorHandler = (err: Error) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: `Oops! ${err}`,
        type: 'error'
      }
    });
  };

  return (
    <Router>
      {token
        ? (<AppContainer token={token} />)
        : (<Route path='/' exact render={() => <Login loginURL={loginURL} />} />)}
    </Router>
  );
}

export default App;
