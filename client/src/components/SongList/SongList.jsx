import React from 'react';
import Song from '../Song/Song';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import './SongList.css';

function SongList (props) {
  const { currPlaylist } = props;

  const songs = currPlaylist?.tracks.items.map(s => <Song song={s.track} />)
  
  return (
    <div className='songs-container'>
      <div className='song-icons'>
        <PlayCircleOutlineIcon fontSize='large' className='shuffle' />
        <StarBorderIcon fontSize='large' />
        <MoreHorizIcon fontSize='large'/>
      </div>
      {songs}
    </div>
  )
}

export default SongList;
