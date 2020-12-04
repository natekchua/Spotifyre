import React, { useEffect, useState } from 'react'

import './TopTracks.css'
import { useProviderValue } from '../../ContextState/Provider'
import { getPlaybackState, playSong, topTracks } from '../../../services/apiRequests'
import { wait } from '../../../services/helperFunctions'
import Track from './Track/Track'

function TopTracks () {
  const [dispatch] = useProviderValue()
  const [songs, setSongs] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    topTracks().then(r => {
      setSongs(JSON.parse(r))
    }).catch(() => {
      setError('Error: Problem fetching top tracks, spotify premium is required.')
    })
  }, [])

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

  const songItems = songs?.map((s, idx) => <Track key={idx} song={s.track} onPlaySong={onPlaySong}/>)

  return (
    <div>
      <div className='songs-header'>
        <p>Your Top Tracks</p>
      </div>
      <>{error ? error : songItems}</>
    </div>
  )
}

export default TopTracks
