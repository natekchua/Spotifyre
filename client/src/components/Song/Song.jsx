import React, { useState } from 'react';
import { getDuration } from '../../services/helperFunctions';
import { useProviderValue } from '../ContextState/Provider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './Song.css';

const initialState = {
  mouseX: null,
  mouseY: null,
};

function Song (props) {
  const [{ curatorPlaylist }, dispatch] = useProviderValue();
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
  };
  
  const suggestSongToPlaylist = () => {
    console.log(`suggesting ${song?.name} to Playlist ${curatorPlaylist?.name}.`)
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
      <p className='p5'>{getDuration(song.duration_ms)}</p>
      { curatorPlaylist && !curatorView
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
            <MenuItem onClick={suggestSongToPlaylist}>
              Suggest '{song?.name}' to Playlist '{curatorPlaylist?.name}'
            </MenuItem>
          </Menu>
        : null 
      }
    </div>
  )
}

export default Song;
