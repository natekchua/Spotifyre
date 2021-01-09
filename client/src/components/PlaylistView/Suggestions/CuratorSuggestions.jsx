import React, { useState, useEffect } from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import CuratorSuggestionRow from './SuggestionRow/CuratorSuggestionRow';
import { useInfoStyles } from '../../../MUIStyles';
import InfoModal from '../../InfoModal/InfoModal';
import {
  getPlaybackState,
  playSong
} from '../../../services/apiRequests';
import { getSuggestionsForPlaylist } from '../../../services/dbRequests';
import { wait } from '../../../services/helperFunctions';
import RefreshIcon from '@material-ui/icons/Refresh';
import Badge from '@material-ui/core/Badge';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Fade from '@material-ui/core/Fade';

import './Suggestions.css';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  opacity: isDragging ? 0.8 : 1,
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'rgba(64, 8, 109, 0.44)' : 'rgba(64, 8, 109, 0.21)'
});

function CuratorSuggestions () {
  const classes = useInfoStyles();
  const [{
    curatorSuggestions,
    curatorPlaylist,
    user
  }, dispatch] = useProviderValue();

  useEffect(() => {
    // get suggestions from DB if playlist suggestion isn't loaded or new playlist suggestions are generated.
    if (!curatorSuggestions?.length || curatorSuggestions[0]?.playlistid !== curatorPlaylist?.id) {
      refreshSuggestions();
    }
  }, []);

  const [suggestionsInfo, setSuggestionsInfo] = useState(false);

  const openSuggestionsInfo = () => setSuggestionsInfo(true);
  const closeSuggestionsInfo = () => setSuggestionsInfo(false);

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

  const refreshSuggestions = async (manualRefresh = false) => {
    getSuggestionsForPlaylist(curatorPlaylist.id).then(res => {
      dispatch({
        type: 'SET_CURATOR_SUGGESTIONS',
        curatorSuggestions: JSON.parse(res)
      });
      if (manualRefresh) {
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: {
            message: 'The curator playlist suggestions have been refreshed.',
            type: 'success'
          }
        });
      }
    });
  };

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
          <CuratorSuggestionRow suggestion={s} onPlaySong={onPlaySong} />
        </li>
        )}
      </Draggable>
    );
  });

  return (
    <div className='suggestion-box'>
      <div className='songs-header p20'>
        <p>Suggestion Details</p>
        <p>Suggested By</p>
      </div>
      <div className='icons'>
        <div className='refresh-icon'>
          <RefreshIcon onClick={() => refreshSuggestions(true)} />
        </div>
        <Badge className='suggestions-info-icon' onClick={openSuggestionsInfo} color='secondary'>
          <InfoOutlinedIcon />
        </Badge>
      </div>
      <InfoModal isOpen={suggestionsInfo} closeInfo={closeSuggestionsInfo}>
        <Fade in={suggestionsInfo}>
          <div className={classes.paper}>
            <div className='info-box flex-basic'>
              <h2 className='flex-basic' id='transition-modal-title'>
                Curator Suggestions
              </h2>
            </div>
            <div id='transition-modal-description'>
              <p>
                To <strong>suggest a song</strong> to a Curator&lsquo;s playlist, right click on the song on the left playlist view and click Suggest. You will only be able to suggest to the playlist if the user has curator mode enabled.
              </p>
            </div>
          </div>
        </Fade>
      </InfoModal>
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

export default CuratorSuggestions;
