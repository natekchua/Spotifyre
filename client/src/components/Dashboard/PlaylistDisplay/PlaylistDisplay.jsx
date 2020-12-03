import React from 'react'

import './PlaylistDisplay.css'
import { wait } from '../../../services/helperFunctions'
import { getPlaybackState, playPlaylist } from '../../../services/apiRequests'

function PlaylistDisplay (props) {
  const { playlist } = props
  const [{}, dispatch] = useProviderValue()

  const onPlayPlaylist = async () => {
    await playPlaylist(playlist.id)
    await wait(200)
    getPlaybackState().then(res => {
      dispatch({
        type: 'SET_CURR_SONG',
        songObj: res.song?.item
      })
      dispatch({
        type: 'SET_SONG_STATUS',
        isPlaying: res.isPlaying
      })
    })
  }

  return (
    <>
      <div className='playlist-container'>
        <div className="playlist-info p10">
          <img src={playlist?.images[0].url} alt='album-art' onClick={onPlayPlaylist}/>
          <div className="playlist-text">
            <h1>{playlist?.name}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaylistDisplay
