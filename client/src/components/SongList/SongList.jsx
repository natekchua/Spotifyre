import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import Song from '../Song/Song';
import { 
  getPlaybackState,
  playSong
} from '../../services/apiRequests';
import { wait } from '../../services/helperFunctions';

import './SongList.css';

function SongList (props) {
  const { playlist } = props;
  const [{ }, dispatch] = useProviderValue();

  const onPlaySong = async (id) => {
    await playSong(id);
    await wait(200);
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
  };

  const songs = playlist?.tracks.items.map((s, idx) => <Song key={idx} song={s.track} onPlaySong={onPlaySong} />)

  return (
    <div>
      <div className='songs-header'>
        <p>Song Details</p>
        <p>Duration</p>
      </div>
      {songs}
    </div>
  )
}

export default SongList;
