import React from 'react'
import './Track.css'
import { getDuration } from '../../../../services/helperFunctions'

function Track (props) {
  const { song, onPlaySong } = props

  return (
    <div className='song-row p20' onClick={() => onPlaySong(song.id)}>
      <div className='flex-basic'>
        {/*<img src={song?.album.images[0]?.url} alt='song' />*/}
        <div className='song-info'>
          <h1>{song?.name}</h1>
          <p className='p5'>{song?.artists.map(a => a.name).join(', ')}</p>
          {/*<p className='ml5'>{song?.name !== song?.album.name ? song?.album.name : null}</p>*/}
        </div>
      </div>
      <p className='p5'>{getDuration(song.duration_ms)}</p>
    </div>
  )
}

export default Track
