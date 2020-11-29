import React, { useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Slider } from '@material-ui/core';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PlaybackControl from './PlaybackControl/PlaybackControl';

import './Footer.css';

function Footer (props) {
  const { spotify } = props;
  const [{
    currSong,
    songStatus
  }, dispatch] = useProviderValue();

  useEffect(() => {
    // Get Current song
    spotify.getMyCurrentPlaybackState().then(song => {
      dispatch({
        type: 'SET_CURR_SONG',
        songObj: song.item
      });
      dispatch({
        type: 'SET_SONG_STATUS',
        isPlaying: true
      });
    });
  }, [spotify]);

  return (
    <div className='footer'>
      <div className='album-desc'>
        { 
          songStatus && currSong
            ? <>
                <img src={currSong.album.images[1].url} alt='Current Album Art' />
                <div className='song-info'>
                  <h4>{currSong.name}</h4>
                  <p>{currSong.artists.map(a => a.name).join(', ')}</p>
                </div>
              </>
            : <div className='song-info'>
                <h3>Click Play!</h3>
              </div>
        }     
      </div>
      <PlaybackControl spotify={spotify} />
      <div className='volume-control'>
        <VolumeDownIcon className='outer-control-icon pr10' />
        <Slider id='volume' />
      </div>
    </div>
  );
}

export default Footer;
