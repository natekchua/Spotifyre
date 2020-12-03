import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import he from 'he';
import SongList from '../SongList/SongList';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { 
  getPlaybackState,
  playPlaylist
} from '../../services/apiRequests';
import { wait } from '../../services/helperFunctions';

import './PlaylistView.css';

function PlaylistView (props) {
  const { playlist } = props;
  const [{ }, dispatch] = useProviderValue();

  const onPlayPlaylist = async () => {
    await playPlaylist(playlist.id);
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

  return (
    <>
      <div className='playlist-container'>
        <div className="playlist-info p10">
          <img src={playlist?.images[0].url} alt='album-art' />
          <div className="playlist-text">
            <h1>{playlist?.name}</h1>
            <p>{he.decode(playlist?.description)}</p>
            <br />
            <p>Created by <strong>{playlist?.owner.display_name}</strong></p>
            <p>{playlist?.tracks.total} Songs</p>
            <p>{playlist?.followers.total} Followers</p>
            <PlayCircleOutlineIcon onClick={onPlayPlaylist} fontSize='large' className='play-playlist' />
          </div>
        </div>
        <SongList playlist={playlist} />
      </div>
    </>
  );
}

export default PlaylistView;
