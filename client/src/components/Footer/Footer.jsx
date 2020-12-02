import React, { useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Slider } from '@material-ui/core';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PlaybackControl from './PlaybackControl/PlaybackControl';
import { 
  getPlaybackState
} from '../../services/apiRequests';

import './Footer.css';

function Footer () {
  const [{
    currSong,
    songStatus
  }, dispatch] = useProviderValue();

  useEffect(() => {
    getPlaybackState().then(res => {
        dispatch({
        type: 'SET_CURR_SONG',
        songObj: res.song?.item
      });
      dispatch({
        type: 'SET_SONG_STATUS',
        isPlaying: res.isPlaying
      });
    })
  }, []);

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
      <PlaybackControl />
      <div className='volume-control'>
        <VolumeDownIcon className='outer-control-icon pr10' />
        <Slider id='volume' />
      </div>
    </div>
  );
}

export default Footer;
