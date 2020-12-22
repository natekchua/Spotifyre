import React from 'react';
import { Link } from 'react-router-dom';

import './Option.css';

function PlaylistOption (props) {
  const {
    optionName,
    Icon,
    playlist,
    onSelectPlaylist
  } = props;

  return (
    <Link to='/collaborate' className='option-link'>
      <div className='option flex-basic p5' onClick={() => onSelectPlaylist(playlist.id)}>
        { Icon && <Icon className='option-icon pr10' />}
        { Icon ? <h4>{optionName}</h4> : <h5>{optionName}</h5> }
      </div>
    </Link>
  );
}

export default PlaylistOption;
