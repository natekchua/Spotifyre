import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import he from 'he';
import SongList from '../SongList/SongList';
import Search from '../Search/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PlaylistResultsList from './PlaylistResultsList/PlaylistResultsList';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { 
  getPlaybackState,
  playPlaylist
} from '../../services/apiRequests';
import { wait } from '../../services/helperFunctions';

import './PlaylistView.css';

function CuratorPlaylistView (props) {
  const { playlist } = props;
  const [{ playlistSearchResults, isSearching }, dispatch] = useProviderValue();

  const goBackToSearch = () => {
    dispatch({
      type: 'SET_CURATOR_PLAYLIST',
      curatorPlaylist: []
    })
    dispatch({
      type: 'SET_IS_SEARCHING',
      isSearching: true
    })
  }

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

  const searchPage = (
    <div className='playlist-container'>
      <Search />
        { playlistSearchResults?.playlists
          ? <PlaylistResultsList playlistsFromQuery={playlistSearchResults.playlists} />
          : <h1 className='flex-basic p20'>Search for a playlist!</h1>
        }
    </div>
  );

  return (
    <>
    { playlist && !isSearching
        ? <div className='playlist-container'>
            <div className='back-button flex-basic p10' onClick={goBackToSearch}><ArrowBackIcon /> Back To Search</div>
            <div className="playlist-info p10">
              <img src={playlist?.images[0]?.url} alt='' />
              <div className="playlist-text">
                <h1>{playlist?.name}</h1>
                <p>{he.decode(playlist?.description)}</p>
                <br />
                <p>Created by <strong>{playlist?.owner.display_name}</strong></p>
                <p><strong>{playlist?.tracks.items.length}</strong> Songs</p>
                <p><strong>{playlist?.followers.total}</strong> Followers</p>
                <PlayCircleOutlineIcon onClick={onPlayPlaylist} fontSize='large' className='play-playlist' />
              </div>
            </div>
            <SongList playlist={playlist} />
          </div>
        : <>{searchPage}</>
    }
    </>
  );
}

export default CuratorPlaylistView;
