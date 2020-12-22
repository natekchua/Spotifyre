import React, { useState, useEffect } from 'react'
import { getCode } from './services/helperFunctions'
import { useProviderValue } from './components/ContextState/Provider'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { getAuthURL, getToken } from './services/apiRequests'
import Login from './components/Login/Login'
import AppContainer from './components/AppContainer/AppContainer'

import './App.css'

function App () {
  const [loginURL, setLoginURL] = useState('')
  const [{ token }, dispatch] = useProviderValue()

  useEffect(() => {
    getAuthURL()
      .then(res => {
        setLoginURL(res.loginURL)
        const code = getCode()
        if (code) {
          getToken(code)
            .then(res => {
              dispatch({
                type: 'SET_TOKEN',
                token: JSON.parse(res).tokens.accessToken
              })
            })
            .catch(err => errorHandler(err))
        }
      })
      .catch((err: Error) => errorHandler(err))
  }, [])

  const errorHandler = (err: Error) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: `Oops! ${err}`,
        type: 'error'
      }
    })
  }

  return (
    <Router>
      {token ? (
        <AppContainer token={token} />
      ) : (
        <Route path='/' exact render={() => <Login loginURL={loginURL} />} />
      )}
    </Router>
  )
}

export default App
