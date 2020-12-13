import React, { useEffect } from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ReactEmoji from 'react-emoji';
import UserSuggestionRow from './SuggestionRow/UserSuggestionRow';
import { 
  getPlaybackState,
  playSong
} from '../../../services/apiRequests';
import { getSuggestionsForPlaylist } from '../../../services/dbRequests';
import { wait } from '../../../services/helperFunctions';
import RefreshIcon from '@material-ui/icons/Refresh';

import './Suggestions.css';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  opacity: isDragging ? 0.8 : 1,
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'rgba(64, 8, 109, 0.44)' : 'rgba(64, 8, 109, 0.21)',
});

function UserSuggestions () {
  const [{ 
    userSuggestions,
    currPlaylist,
    user
  }, dispatch] = useProviderValue();

  useEffect(() => {
    // get suggestions from DB if playlist suggestion isn't loaded or new playlist suggestions are generated.
    if (!userSuggestions?.length || userSuggestions[0]?.playlistid !== currPlaylist?.id) { 
      refreshSuggestions();
    }
  }, [])
  
  const onPlaySong = async (safeToPlay = false, id) => {
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
      })
    }
  }

  const refreshSuggestions = () => {
    getSuggestionsForPlaylist(currPlaylist.id).then(res => {
      dispatch({
        type: 'SET_USER_SUGGESTIONS',
        userSuggestions: JSON.parse(res)
      })
    }) 
  }

  const suggestionsList = userSuggestions?.map((s, idx) => {
    return (
      <Draggable key={idx} draggableId={idx + 's'} index={idx}>
        {(provided, snapshot) => (
        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )
        }>
          <UserSuggestionRow suggestion={s} onPlaySong={onPlaySong} />
        </li>
        )}
      </Draggable>
    );
  })

  return (
    <div className='suggestion-box'>
      <div className='songs-header p20'>
        <p>Suggestion Details</p>
        <p style={{ marginRight: '85px' }}>Suggested By</p>
      </div>
      <div className='refresh-icon'>
        <RefreshIcon onClick={refreshSuggestions} /> 
      </div>
      <Droppable droppableId='songs'>
        {(provided, snapshot) => (
          <ul style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps} ref={provided.innerRef}>
            {!suggestionsList.length ? <h3 className='flex-basic m30'>No one has suggested songs to this playlist yet&nbsp;{ReactEmoji.emojify(':(')}</h3> : null}
            {suggestionsList}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>  
    </div>
  );
}

export default UserSuggestions;
