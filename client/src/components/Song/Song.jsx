import React, { useState } from 'react';
import { getDuration } from '../../services/helperFunctions';
import { useProviderValue } from '../ContextState/Provider';
import { suggestSongToPlaylist, getSuggestionsForPlaylist } from '../../services/dbRequests';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './Song.css';

const initialState = {
  mouseX: null,
  mouseY: null,
};

function Song (props) {
  const [{
    tab,
    user,
    curator,
    curatorSettings,
    curatorPlaylist,
    settingsSetByCurator
  }, dispatch] = useProviderValue();
  const { song, onPlaySong, curatorView } = props;
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

  const handleClose = () => {
    setState(initialState);
    setSafeToPlay(true);
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

  const suggestSong = () => {
    const params = { 
      songInfo: {
        id: song.id,
        name: song.name.replace(/'/g, ''),
        artist: song.artists.map(a => a.name).join(', ').replace(/'/g, ''),
        albumArt: song.album.images[0].url
      },
      playlistInfo: { 
        id: curatorPlaylist.id,
        name: curatorPlaylist.name, 
        ownerID: curator.id
      },
      suggestedByUserInfo: {
        id: user.id,
        name: user.display_name.replace(/'/g, '')
      }
    };

    // TODO: check current entries with curator Settings to see if they satisfy conditions before posting API request.
    if (curator.id !== user.id) {
      suggestSongToPlaylist(params).then(() => {
        getSuggestionsForPlaylist(curatorPlaylist.id).then(res => {
          console.log(res)
          dispatch({
            type: 'SET_CURATOR_SUGGESTIONS',
            curatorSuggestions: JSON.parse(res)
          })
          dispatch({
            type: 'SET_NOTIFICATION',
            notification: {
              message: 'Song suggestion successfully submitted to playlist.',
              type: 'success'
            }
          });
        })
      }).catch(err => errorHandler(err));
    } else {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: {
          message: 'Nice try! You cannot suggest songs to your own playlist.',
          type: 'error'
        }
      });
    }
  }

  return (
    <div className='flex-basic song-row p20' onClick={() => onPlaySong(safeToPlay, song.id)} onContextMenu={onRightClick}>
      <div className='flex-basic'>
        <img src={song?.album.images[0]?.url} alt='song' />
        <div className='song-info'>
          <h1>{song?.name}</h1>
          <p className='p5'>{song?.artists.map(a => a.name).join(', ')}</p>
          <p className='ml5'>{song?.name !== song?.album.name ? song?.album.name : null}</p>
        </div>
      </div>
      <p className='p5'>{getDuration(song?.duration_ms)}</p>
      { curatorPlaylist?.name && !curatorView && tab === 'Collaborate' && settingsSetByCurator
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
            <MenuItem onClick={suggestSong}>
              Suggest '{song?.name}' to Playlist '{curatorPlaylist?.name}'
            </MenuItem>
          </Menu>
        : null 
      }
    </div>
  )
}

export default Song;
