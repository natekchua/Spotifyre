import React from 'react';
import he from 'he';
import SongList from '../SongList/SongList';

import './PlaylistView.css';

function PlaylistView (props) {
  const { playlist } = props;

  return (
    <>
      <div className='playlist-container'>
        <div className="playlist-info p10">
          <img src={playlist?.images[0]?.url} alt='' />
          <div className="playlist-text">
            <h1>{playlist?.name}</h1>
            <p>{he.decode(playlist?.description)}</p>
          </div>
        </div>
        <SongList playlist={playlist} />
      </div>
    </>
  );
}

export default PlaylistView;
