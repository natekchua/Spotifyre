import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getCode } from './services/helperFunctions';
import { useProviderValue } from './components/ContextState/Provider';
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
        const { loginURL } = await getAuthURL();
        setLoginURL(loginURL);
        const code = getCode();
        console.log({ code });
        if (code) {
          const resp = await getToken(code);
          const {
            tokens: { accessToken: token }
          } = JSON.parse(resp);
          dispatch({
            type: 'SET_TOKEN',
            token
          });
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
      {token ? (
        <AppContainer token={token} />
      ) : (
        <Route path="/" exact render={() => <Login loginURL={loginURL} />} />
      )}
    </Router>
  );
}

export default App;
