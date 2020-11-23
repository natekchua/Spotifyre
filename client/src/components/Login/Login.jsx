import React from 'react';
import './Login.css';
import spotifyreLogo from '../../icons/spotifyre.png';
import { loginURL } from '../../services/spotifyUtils';

function Login () {
  return (
    <div className='login-page flex-basic'>
      <div className='title flex-basic'>
        <img src={spotifyreLogo} alt='logo'/>
        <h1>Spotifyre</h1>
      </div>
      <h2>A Spotify Manager for Playlist Curators</h2>
      <a href={loginURL}>Login with Spotify</a>
    </div>
  )
}

export default Login;
