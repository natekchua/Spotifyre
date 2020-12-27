import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import PlaylistPanelHandler from './PlaylistPanel/PlaylistPanelHandler';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SongResultsList from './SongsResultsList/SongsResultsList';
import SongSearch from '../Search/SongSearch';
import SearchIcon from '@material-ui/icons/Search';
import he from 'he';
import {
  getPlaybackState,
  playPlaylist
} from '../../services/apiRequests';
import { wait } from '../../services/helperFunctions';

import './PlaylistView.css';

function PlaylistView (props) {
  const { playlist } = props;
  const [{
    songsSearchResults,
    isSongSearching,
    user
  }, dispatch] = useProviderValue();
  const onPlayPlaylist = async () => {
    const params = {
      playlistID: playlist.id,
      userID: user.id
    };
    await playPlaylist(params);
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

  const goToSearch = () => {
    dispatch({
      type: 'SET_IS_SONG_SEARCHING',
      isSongSearching: true
    });
  };

  const searchPage = (
    <div className='playlist-container'>
      <SongSearch />
      { songsSearchResults?.tracks
        ? <SongResultsList songsFromQuery={songsSearchResults.tracks} />
        : <h1 className='flex-basic p20'>Search for a song!</h1>
      }
    </div>
  );

  return (
    <>
    { !isSongSearching
      ? <div className='playlist-container'>
          <div className='playlist-info p10'>
            <img src={playlist?.images[0]?.url} alt='album-art' />
            <div className='playlist-text'>
              <h1>{playlist?.name}</h1>
              <p>{he.decode(playlist?.description)}</p>
              <br />
              <p>Created by <strong>{playlist?.owner.display_name}</strong></p>
              <p><strong>{playlist?.tracks?.total}</strong> {playlist?.tracks?.total === 1 ? 'Song' : 'Songs'}</p>
              <p><strong>{playlist?.followers?.total}</strong> {playlist?.followers?.total === 1 ? 'Follower' : 'Followers'}</p>
              <PlayCircleOutlineIcon onClick={onPlayPlaylist} fontSize='large' className='play-playlist' />
            </div>
            <div className='back-button flex-basic p10' onClick={goToSearch}><SearchIcon /></div>
          </div>
          <PlaylistPanelHandler playlist={playlist} curatorView={false} />
        </div>
      : <>{searchPage}</>
    }
    </>
  );
}

export default PlaylistView;
