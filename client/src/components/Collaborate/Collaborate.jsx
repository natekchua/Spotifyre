import React, { useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { DragDropContext } from 'react-beautiful-dnd';
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

  const onDragEnd = (result) => {
    console.log('drag end: ', result)
  }

  return (
    <div className='collaborate-container'>
      <DragDropContext onDragEnd={onDragEnd}>
        <PlaylistView playlist={currPlaylist} />
        <CuratorPlaylistView playlist={curatorPlaylist} />
      </DragDropContext>
    </div>
  );
}

export default Collaborate;
