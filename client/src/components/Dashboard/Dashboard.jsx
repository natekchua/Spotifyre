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
        <div>
          {/*TODO:get top playlist from database? */}
        </div>
      </div>
      <div>
        Recommended Playlists
        <div>
          {/*TODO: get suggested playlist*/}
        </div>
      </div>
      <div>
        Recently Played Songs
        <div>
          {/*TODO:get recently played songs from spotify */}
        </div>
      </div>
    </>
  )
}

export default Dashboard
