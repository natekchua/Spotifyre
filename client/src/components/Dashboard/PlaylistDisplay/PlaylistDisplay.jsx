import React from 'react'

import './PlaylistDisplay.css'
import { wait } from '../../../services/helperFunctions'
import { getPlaybackState, playPlaylist } from '../../../services/apiRequests'
import { useProviderValue } from '../../ContextState/Provider'

function PlaylistDisplay (props) {
  let { playlist } = props
  const [dispatch] = useProviderValue()

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
      <div className="dash-playlist-info p10">
        <img src={playlist?.images[0]?.url} alt='album-art' onClick={onPlayPlaylist}/>
      </div>
    </>
  )
}

export default PlaylistDisplay
