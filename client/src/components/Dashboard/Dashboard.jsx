import React, { useEffect } from 'react'
import { useProviderValue } from '../ContextState/Provider'
import './Dashboard.css'

function Dashboard () {
  const [dispatch] = useProviderValue()

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
      </div>
      <div>
        Recommended Playlists
      </div>
      <div>
        Recently Played Songs
      </div>
    </>
  )
}

export default Dashboard
