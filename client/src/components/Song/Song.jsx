import React from 'react';

import './Song.css';

function Song (props) {
  const { song, onPlaySong } = props;

  return (
    <div className='song-row p20' onClick={() => onPlaySong(song.id)}>
      <img src={song.album.images[0].url} alt='song' />
      <div className="song-info">
        <h1>{song.name}</h1>
        <p className='p5'>{song.artists.map(a => a.name).join(', ')}</p>
        <p className='ml5'>{song.name !== song.album.name ? song.album.name : null}</p>
      </div>
    </div>
  )
}

export default Song;
