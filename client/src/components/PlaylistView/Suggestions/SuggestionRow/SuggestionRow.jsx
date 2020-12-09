import React, { useState } from 'react';
import { useProviderValue } from '../../../ContextState/Provider';
import { removeSuggestionFromPlaylist, getSuggestionsForPlaylist } from '../../../../services/dbRequests';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './SuggestionRow.css';

const initialState = {
  mouseX: null,
  mouseY: null,
};

function SuggestionRow (props) {
  const [{ 
    user,
    curatorPlaylist
  }, dispatch] = useProviderValue();
  const { suggestion, onPlaySong } = props
  const [state, setState] = useState(initialState);
  const [safeToPlay, setSafeToPlay] = useState(true);

  const onRightClick = (e) => {
    e.preventDefault();
    setState({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    });
    setSafeToPlay(false);
  }

  const removeSuggestion = () => {
    const params = {
      songID: suggestion?.songid,
      playlistID: suggestion?.playlistid
    }
    removeSuggestionFromPlaylist(params).then(res => {
      console.log(res)
      getSuggestionsForPlaylist(curatorPlaylist.id).then(res => {
        dispatch({
          type: 'SET_CURATOR_SUGGESTIONS',
          curatorSuggestions: JSON.parse(res)
        })
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }

  const handleClose = () => {
    setState(initialState);
    setSafeToPlay(true);
  }

  return (
    <>
      <div className='flex-basic suggestion-row p20' onClick={() => onPlaySong(safeToPlay, suggestion?.songid)} onContextMenu={onRightClick}>
        <div className='flex-basic'>
          <img src={suggestion?.album_art} alt='suggestion' />
          <div className='suggestion-info'>
            <h1>{suggestion?.song_title}</h1>
            <p className='p5'>{suggestion?.artist}</p>
          </div>
        </div>
        <p className='p5'>{suggestion?.suggested_by_username}</p>
      </div>
      { suggestion.suggested_by_userid === user.id
        ? <Menu     
            keepMounted
            open={state.mouseY !== null}
            onClose={handleClose}
            anchorReference='anchorPosition'
            anchorPosition={
              state.mouseY !== null && state.mouseX !== null
                ? { top: state.mouseY, left: state.mouseX }
                : null
            }
          >
            <MenuItem onClick={removeSuggestion}>
              Remove Suggestion '{suggestion?.song_title}' from Playlist '{suggestion.playlist}'?
            </MenuItem>
          </Menu>
        : null
      }
    </>
  );
}

export default SuggestionRow;
