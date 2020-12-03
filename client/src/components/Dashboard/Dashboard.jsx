import React, { useEffect } from 'react'
import { useProviderValue } from '../ContextState/Provider'
import './Dashboard.css'
import PlaylistDisplay from './PlaylistDisplay/PlaylistDisplay'
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayedList'

function Dashboard () {
  const [{ playOnRepeat, playRewind, playCapsule }, dispatch] = useProviderValue()

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Dashboard'
    })
  }, [])



  return (
    <>
      <div>
        Top Playlist
        <div>
          <PlaylistDisplay playlist={playOnRepeat}/>
          <PlaylistDisplay playlist={playRewind}/>
          <PlaylistDisplay playlist={playCapsule}/>
        </div>
      </div>
      <div>
        Recently Played Songs
        <div>
          <RecentlyPlayed/>
        </div>
      </div>
    </>
  )
}

export default Dashboard
