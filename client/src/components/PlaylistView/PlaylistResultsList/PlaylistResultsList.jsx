import React from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import { selectPlaylist } from '../../../services/apiRequests';
import PlaylistRow from './PlaylistRow/PlaylistRow';

import './PlaylistResultsList.css';

function PlaylistResultsList (props) {
  const { playlistsFromQuery, goBackToCuratorPlaylist } = props;
  const [{ 
    playlistSearchQuery,
    isPlaylistSearching,
    curator,
    user
  }, dispatch] = useProviderValue();

  const onSelectPlaylist = (id) => {
    const params = {
      playlistID: id,
      userID: user.id
    };
    selectPlaylist(params).then(res => {
      dispatch({
        type: 'SET_CURATOR_PLAYLIST',
        curatorPlaylist: JSON.parse(res).playlist
      })
      dispatch({
        type: 'SET_IS_PLAYLIST_SEARCHING',
        isPlaylistSearching: false
      })
      if (goBackToCuratorPlaylist) {
        goBackToCuratorPlaylist();
      }
    }).catch(err => console.log(err))
  };

  const playlistRows = playlistsFromQuery?.items?.map((p, idx) =>
    <PlaylistRow
      key={idx}
      playlist={p}
      onSelectPlaylist={onSelectPlaylist}
    />
  );

  return (
    <div className='playlist-query-results'>
      { isPlaylistSearching 
        ? <h3>Results found for "{playlistSearchQuery}". {playlistsFromQuery.items.length} playlists returned.</h3> 
        : <h2 className='center-text p5'>{curator.display_name}'s Public Playlists</h2>
      }
      {playlistRows}
    </div>
  );
}

export default PlaylistResultsList;
