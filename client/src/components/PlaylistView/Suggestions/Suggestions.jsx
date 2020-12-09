import React, { useEffect } from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import SuggestionRow from './SuggestionRow/SuggestionRow';
import { 
  getPlaybackState,
  playSong
} from '../../../services/apiRequests';
import { getSuggestionsForPlaylist } from '../../../services/dbRequests';
import { wait } from '../../../services/helperFunctions';

import './Suggestions.css';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  opacity: isDragging ? 0.8 : 1,
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'rgba(64, 8, 109, 0.44)' : 'rgba(64, 8, 109, 0.21)',
});

function Suggestions () {
  const [{ 
    curatorSuggestions,
    curatorPlaylist 
  }, dispatch] = useProviderValue();

  useEffect(() => {
    if (!curatorSuggestions.length) {
      getSuggestionsForPlaylist(curatorPlaylist.id).then(res => {
        console.log(res)
        dispatch({
          type: 'SET_CURATOR_SUGGESTIONS',
          curatorSuggestions: JSON.parse(res)
        })
      }) 
    }
  }, [])
  
  const onPlaySong = async (safeToPlay, id) => {
    if (safeToPlay) {
      await playSong(id)
      await wait(200)
      getPlaybackState().then(res => {
        dispatch({
          type: 'SET_CURR_SONG',
          songObj: res.song?.item
        })
        dispatch({
          type: 'SET_SONG_STATUS',
          isPlaying: res.isPlaying
        })
      })
    }
  }

  const suggestionsList = curatorSuggestions?.map((s, idx) => {
    return (
      <Draggable key={idx} draggableId={idx + 's'} index={idx}>
        {(provided, snapshot) => (
        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )
        }>
          <SuggestionRow suggestion={s} onPlaySong={onPlaySong} />
        </li>
        )}
      </Draggable>
    )
  })

  return (
    <div className='suggestion-box'>
      <div className='songs-header'>
        <p>Suggestion Details</p>
        <p>Suggested By</p>
      </div>
        <Droppable droppableId='songs'>
          {(provided, snapshot) => (
            <ul style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps} ref={provided.innerRef}>
              {!suggestionsList.length ? <h3 className='flex-basic m30'>Add your suggestions here!</h3> : null}
              {suggestionsList}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>  
    </div>
  );
}

export default Suggestions;

