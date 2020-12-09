import React from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import { selectPlaylist } from '../../../services/apiRequests';
import PlaylistRow from './PlaylistRow/PlaylistRow';

import './PlaylistResultsList.css';

function PlaylistResultsList (props) {
  const { playlistsFromQuery, goBackToCuratorPlaylist } = props;
  const [{ 
    searchQuery,
    isSearching,
    curator
  }, dispatch] = useProviderValue();

  const onSelectPlaylist = (id) => {
    selectPlaylist(id).then(res => {
      dispatch({
        type: 'SET_CURATOR_PLAYLIST',
        curatorPlaylist: JSON.parse(res).playlist
      })
      dispatch({
        type: 'SET_IS_SEARCHING',
        isSearching: false
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
      { isSearching 
        ? <h3>Results found for "{searchQuery}". {playlistsFromQuery.items.length} playlists returned.</h3> 
        : <h3>{curator.display_name}'s Public Playlists</h3>
      }
      {playlistRows}
    </div>
  );
}

export default PlaylistResultsList;
