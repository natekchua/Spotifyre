import React, { useState } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import he from 'he';
import PlaylistPanelHandler from './PlaylistPanel/PlaylistPanelHandler';
import PlaylistSearch from '../Search/PlaylistSearch';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PlaylistResultsList from './PlaylistResultsList/PlaylistResultsList';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {
  getPlaybackState,
  playPlaylist,
  getCuratorPlaylists
} from '../../services/apiRequests';
import { wait } from '../../services/helperFunctions';

import './PlaylistView.css';

function CuratorPlaylistView (props) {
  const { playlist } = props;
  const [{
    playlistSearchResults,
    isPlaylistSearching,
    curator,
    user
  }, dispatch] = useProviderValue();
  const [curatorPlaylists, setCuratorPlaylists] = useState([]);

  const goBackToSearch = () => {
    dispatch({
      type: 'SET_CURATOR_PLAYLIST',
      curatorPlaylist: []
    });
    dispatch({
      type: 'SET_IS_PLAYLIST_SEARCHING',
      isPlaylistSearching: true
    });
  };

  const goBackToCuratorPlaylist = () => {
    setCuratorPlaylists([]);
  };

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

  const seeCuratorsPlaylists = async () => {
    const params = {
      curatorID: curator.id,
      userID: user.id
    };
    getCuratorPlaylists(params).then(res => {
      setCuratorPlaylists(JSON.parse(res).curatorPlaylists);
    });
  };

  const curatorProfile = (
    <div className='playlist-container'>
      <div className='back-button flex-basic p10' onClick={goBackToCuratorPlaylist}><ArrowBackIcon /></div>
      <PlaylistResultsList playlistsFromQuery={curatorPlaylists} goBackToCuratorPlaylist={goBackToCuratorPlaylist} />
    </div>
  );

  const searchPage = (
    <div className='playlist-container'>
      <PlaylistSearch />
      { playlistSearchResults?.playlists
        ? <PlaylistResultsList playlistsFromQuery={playlistSearchResults.playlists} />
        : <h1 className='flex-basic p20'>Search for a playlist!</h1>
      }
    </div>
  );

  return (
    <>
      { curatorPlaylists?.items?.length > 0
        ? <>{curatorProfile}</>
        : playlist && !isPlaylistSearching && !curatorPlaylists?.items?.length
          ? <div className='playlist-container'>
                <div className="playlist-info p10">
                  <img src={playlist?.images[0]?.url} alt='' />
                  <div className="playlist-text">
                    <h1>{playlist?.name}</h1>
                    <p>{he.decode(playlist?.description)}</p>
                    <br />
                    <div className='flex-basic'>
                      <p>By:&nbsp;</p><div className='profile-name p10' onClick={seeCuratorsPlaylists}><strong>{playlist?.owner.display_name}</strong></div>
                    </div>
                    <br />
                    <p><strong>{playlist?.tracks.total}</strong> {playlist?.tracks.total === 1 ? 'Song' : 'Songs'}</p>
                    <p><strong>{playlist?.followers.total}</strong> {playlist?.followers.total === 1 ? 'Follower' : 'Followers'}</p>
                    <PlayCircleOutlineIcon onClick={onPlayPlaylist} fontSize='large' className='play-playlist' />
                  </div>
                  <div className='back-button flex-basic p10' onClick={goBackToSearch}><ArrowBackIcon /></div>
                </div>
                <PlaylistPanelHandler playlist={playlist} curatorView={true} />
            </div>
          : <>{searchPage}</>
      }
    </>
  );
}

export default CuratorPlaylistView;
