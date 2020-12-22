import React from 'react'
import spotifyreLogo from '../../icons/spotifyre.png'

import './Login.css'

function Login (props) {
  return (
    <div className='login-page flex-basic'>
      <div className='title flex-basic'>
        <img src={spotifyreLogo} alt='logo'/>
        <h1>Spotifyre</h1>
      </div>
      <h2>A Spotify Manager for Playlist Curators</h2>
      <a href={props.loginURL}>Login with Spotify</a>
    </div>
  )
}

export default Login
