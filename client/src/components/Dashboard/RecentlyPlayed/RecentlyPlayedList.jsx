import React from 'react'

import './RecentlyPlayedList.css'
import { useProviderValue } from '../../ContextState/Provider'
import { getPlaybackState, playSong } from '../../../services/apiRequests'
import { wait } from '../../../services/helperFunctions'
import Song from '../../Song/Song'

function RecentlyPlayed () {
  const [{ recentSongs }, dispatch] = useProviderValue()

  const onPlaySong = async (id) => {
    await playSong(id)
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

  const songs = recentSongs?.tracks.items.map((s, idx) => <Song key={idx} song={s.track} onPlaySong={onPlaySong}/>)

  return (
    <div>
      <div className='songs-header'>
        <p>RecentlyPlayed</p>
      </div>
      {songs}
    </div>
  )
}

export default RecentlyPlayed
