import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Song from '../Song/Song';
import {
  getPlaybackState,
  playSong
} from '../../services/apiRequests';
import { wait } from '../../services/helperFunctions';

import './SongList.css';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  opacity: isDragging ? 0.8 : 1,
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'rgba(64, 8, 109, 0.44)' : 'rgba(64, 8, 109, 0.21)'
});

function SongList (props) {
  const { playlist, curatorView } = props;
  const [{ user }, dispatch] = useProviderValue();

  const onPlaySong = async (safeToPlay, id) => {
    if (safeToPlay) {
      const params = {
        songID: id,
        userID: user.id
      };
      await playSong(params);
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
    }
  };

  const songs = playlist?.tracks?.items.map((s, idx) => {
    return (
      <Draggable key={s?.track?.id} draggableId={s?.track?.id} index={idx}>
        {(provided, snapshot) => (
          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )
            }>
            <Song song={s?.track} onPlaySong={onPlaySong} curatorView={curatorView} />
          </li>
        )}
      </Draggable>
    );
  });

  return (
    <div>
      <div className='songs-header p20'>
        <p>Song Details</p>
        <p>Duration</p>
      </div>
      <Droppable droppableId='songs'>
        {(provided, snapshot) => (
          <ul style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps} ref={provided.innerRef}>
            {songs}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

export default SongList;
