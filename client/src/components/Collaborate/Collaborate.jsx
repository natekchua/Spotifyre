import React, { useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';

import PlaylistView from '../PlaylistView/PlaylistView';
import CuratorPlaylistView from '../PlaylistView/CuratorPlaylistView';

import './Collaborate.css';

function Collaborate () {
  const [{
    currPlaylist,
    curatorPlaylist
  }, dispatch] = useProviderValue();

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Collaborate'
    })
  }, [])

  return (
    <div className='collaborate-container'>
      <PlaylistView playlist={currPlaylist} />
      <CuratorPlaylistView playlist={curatorPlaylist} />
    </div>
  );
}

export default Collaborate;
