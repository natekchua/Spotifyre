import React from 'react';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { Slider } from '@material-ui/core';

import './Footer.css';

function Footer () {
  return (
    <div className='footer'>
      <div className='album-desc'>
        <img src='' alt='' />
        <div className="song-info">
          <h4>Title</h4>
          <p>Artist Name</p>
        </div>
      </div>
      <div className='playback-control'>
        <ShuffleIcon className='outer-control-icon' />
        <SkipPreviousIcon className='control-icon' />
        <PlayCircleFilledIcon fontSize='large' className='control-icon' />
        <SkipNextIcon className='control-icon' />
        <RepeatIcon className='outer-control-icon' />
      </div>
      <div className='volume-control'>
        <VolumeDownIcon className='outer-control-icon pr10' />
        <Slider id='volume' />
      </div>
    </div>
  );
}

export default Footer;
