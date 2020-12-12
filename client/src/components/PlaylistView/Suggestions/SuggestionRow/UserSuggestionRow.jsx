import React, { useState } from 'react';
import { useProviderValue } from '../../../ContextState/Provider';
import { removeSuggestionFromPlaylist, getSuggestionsForPlaylist } from '../../../../services/dbRequests';
import { addTrackToPlaylist } from '../../../../services/apiRequests';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

import './SuggestionRow.css';

function UserSuggestionRow (props) {
  const [{ 
    user,
    currPlaylist
  }, dispatch] = useProviderValue();
  const { suggestion, onPlaySong } = props
  const [safeToPlay, setSafeToPlay] = useState(true);

  const rejectSuggestion = () => {
    const params = {
      songID: suggestion?.songid,
      playlistID: suggestion?.playlistid
    };
    setSafeToPlay(false);
    removeSuggestionFromPlaylist(params).then(res => {
      getSuggestionsForPlaylist(currPlaylist.id).then(res => {
        dispatch({
          type: 'SET_USER_SUGGESTIONS',
          userSuggestions: JSON.parse(res)
        })
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: {
            message: `Rejected ${suggestion.suggested_by_username}'s suggestion '${suggestion.song_title}' for '${suggestion.playlist}'.`,
            type: 'success'
          }
        });
      }).catch(err => errorHandler(err));
    }).catch(err => errorHandler(err));
  }

  const acceptSuggestion = async () => {
    console.log('accept suggestion');
    const params = {
      songID: suggestion?.songid,
      playlistID: suggestion?.playlistid,
      userID: user.id
    };
    setSafeToPlay(false);
    try {
      await addTrackToPlaylist(params);
      removeSuggestionFromPlaylist(params).then(res => {
        getSuggestionsForPlaylist(currPlaylist.id).then(res => {
          dispatch({
            type: 'SET_USER_SUGGESTIONS',
            userSuggestions: JSON.parse(res)
          })
          dispatch({
            type: 'SET_NOTIFICATION',
            notification: {
              message: `Accepted ${suggestion.suggested_by_username}'s suggestion '${suggestion.song_title}' for '${suggestion.playlist}'!`,
              type: 'success'
            }
          });
        }).catch(err => errorHandler(err));
      }).catch(err => errorHandler(err));
    } catch (err) {
      errorHandler(err);
    }
  }

  const errorHandler = (err) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: `Oops! ${err}`,
        type: 'error'
      }
    });
  }

  return (
    <>
      <div className='flex-basic suggestion-row p20' onClick={() => onPlaySong(safeToPlay, suggestion?.songid)}>
        <div className='flex-basic'>
          <img src={suggestion?.album_art} alt='suggestion' />
          <div className='suggestion-info'>
            <h1>{suggestion?.song_title}</h1>
            <p className='p5'>{suggestion?.artist}</p>
          </div>
        </div>
        <div className='flex-basic'>
          <p className='p5'>{suggestion?.suggested_by_username}</p>
          <div className='flex-basic'>
            <ClearIcon className='reject-suggestion' onClick={rejectSuggestion} />
            <CheckIcon className='accept-suggestion' onClick={acceptSuggestion} />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSuggestionRow;
