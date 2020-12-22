import React from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';
import {
  pause,
  play,
  goPrevious,
  goNext,
  getPlaybackState
} from '../../../services/apiRequests';
import { wait } from '../../../services/helperFunctions';

import './PlaybackControl.css';

function PlaybackControl () {
  const [{
    currSong,
    songStatus,
    user
  }, dispatch] = useProviderValue();

  const prevSong = async () => {
    await goPrevious(user.id);
    await wait(200);
    getPlaybackState(user.id).then(res => {
      dispatch({
        type: 'SET_CURR_SONG',
        songObj: res.song?.item
      });
      dispatch({
        type: 'SET_SONG_STATUS',
        isPlaying: res.isPlaying
      });
    });
  };

  const handlePlayStatus = () => {
    let isPlaying;
    if (songStatus) {
      pause(user.id);
      isPlaying = false;
    } else {
      play(user.id).then(res => {
        if (!currSong) {
          dispatch({
            type: 'SET_CURR_SONG',
            songObj: res?.song.item
          });
        }
      });
      isPlaying = true;
    }
    dispatch({
      type: 'SET_SONG_STATUS',
      isPlaying: isPlaying
    });
  };

  const nextSong = async () => {
    await goNext(user.id);
    await wait(200);
    getPlaybackState(user.id).then(res => {
      dispatch({
        type: 'SET_CURR_SONG',
        songObj: res.song?.item
      });
      dispatch({
        type: 'SET_SONG_STATUS',
        isPlaying: res.isPlaying
      });
    });
  };

  return (
    <div className='playback-control'>
      <ShuffleIcon className='outer-control-icon' />
      <SkipPreviousIcon onClick={prevSong} className='control-icon' />
      {
        !songStatus
          ? <PlayCircleFilledIcon onClick={handlePlayStatus} fontSize='large' className='control-icon' />
          : <PauseCircleFilledIcon onClick={handlePlayStatus} fontSize='large' className='control-icon' />
      }
      <SkipNextIcon onClick={nextSong} className='control-icon' />
      <RepeatIcon className='outer-control-icon' />
    </div>
  );
}

export default PlaybackControl;
