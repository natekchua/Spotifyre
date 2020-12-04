import React, { useEffect, useState } from 'react'
import { useProviderValue } from '../ContextState/Provider'
import './Dashboard.css'
import PlaylistDisplay from './PlaylistDisplay/PlaylistDisplay'
import TopTracks from './TopTracks/TopTracks'
import { selectPlaylist } from '../../services/apiRequests'

function Dashboard () {
  const [{ playOnRepeat, playRewind, playCapsule }, dispatch] = useProviderValue()
  const [playObjRepeat, setObjRepeat] = useState(null)
  const [playObjRewind, setObjRewind] = useState(null)
  const [playObjCapsule, setObjCapsule] = useState(null)

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Dashboard'
    })
    selectPlaylist(playOnRepeat).then(r => {
      setObjRepeat(JSON.parse(r).playlist)
    })
    selectPlaylist(playRewind).then(r => {
      setObjRewind(JSON.parse(r).playlist)
    })
    selectPlaylist(playCapsule).then(r => {
      setObjCapsule(JSON.parse(r).playlist)
    })
  }, [])

  return (
    <>
      <div>
        <div className="dash-playlists">
          <PlaylistDisplay playlist={playObjRepeat}/>
          <PlaylistDisplay playlist={playObjRewind}/>
          <PlaylistDisplay playlist={playObjCapsule}/>
        </div>
      </div>
      <div>
        <TopTracks/>
      </div>
    </>
  )
}

export default Dashboard
