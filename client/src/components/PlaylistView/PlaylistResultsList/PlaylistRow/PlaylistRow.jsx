import React from 'react';
import PropTypes from 'prop-types';

import './PlaylistRow.css';

function PlaylistRow (props) {
  const { playlist, onSelectPlaylist } = props;

  return (
    <div className='playlist-row p20 flex-basic' onClick={() => onSelectPlaylist(playlist.id)}>
      <img src={playlist.images[0]?.url} alt='playlist' />
      <div className='playlist-row-info'>
        <div>
          <h1>{playlist.name}</h1>
          <p className='p5'>By {playlist.owner.display_name}</p>
        </div>
        <p className='ml5'>{playlist.tracks.total} Songs</p>
      </div>
    </div>
  );
}

PlaylistRow.propTypes = {
  playlist: PropTypes.object,
  onSelectPlaylist: PropTypes.func
};

export default PlaylistRow;
