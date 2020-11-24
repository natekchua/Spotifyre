import React from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';

import './PlaybackControl.css';

function PlaybackControl (props) {
  const { spotify } = props;
  const [{
    currSong,
    songStatus
  }, dispatch] = useProviderValue();

  const goPrev = async () => {
    await spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then(song => {
      dispatch({
        type: 'SET_SONG_STATUS',
        isPlaying: true
      });
      dispatch({
        type: 'SET_CURR_SONG',
        songObj: song.item
      });
    });
  };

  const handlePlayStatus = () => {
    if (songStatus) {
      spotify.pause();
      dispatch({
        type: 'SET_SONG_STATUS',
        isPlaying: false
      });
    } else {
      spotify.play();
      dispatch({
        type: 'SET_SONG_STATUS',
        isPlaying: true
      });
    }
  };

  const  goNext = async () => {
    await spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then(song => {
      dispatch({
        type: 'SET_SONG_STATUS',
        isPlaying: true
      });
      dispatch({
        type: 'SET_CURR_SONG',
        songObj: song.item
      });
    });
  };

  return (
    <div className='playback-control'>
      <ShuffleIcon className='outer-control-icon' />
      <SkipPreviousIcon onClick={goPrev} className='control-icon' />
      {
        !songStatus && currSong
          ? <PlayCircleFilledIcon onClick={handlePlayStatus} fontSize='large' className='control-icon' />
          : <PauseCircleFilledIcon onClick={handlePlayStatus} fontSize='large' className='control-icon' />
      }
      <SkipNextIcon onClick={goNext} className='control-icon' />
      <RepeatIcon className='outer-control-icon' />
    </div>
  );
}

export default PlaybackControl;
