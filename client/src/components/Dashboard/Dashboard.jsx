import React, { useEffect, useState } from 'react'
import { useProviderValue } from '../ContextState/Provider'
import './Dashboard.css'
import ShowcasePlaylist from './Showcase/ShowcasePlaylist'
import TopTracks from './TopTracks/TopTracks'
import { getFeaturedPlaylists, selectPlaylist } from '../../services/apiRequests'

function Dashboard () {
  const [{ dashboardPlaylistIDs }, dispatch] = useProviderValue();
  const [repeatPL, setRepeatPL] = useState(null);
  const [topSongsPL, setTopSongsPL] = useState(null);
  const [rewindPL, setRewindPL] = useState(null);
  const [capsulePL, setCapsulePL] = useState(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Dashboard'
    });

    getFeaturedPlaylists().then(res => {
      setFeaturedPlaylists(res.featured.playlists.items);
    })

    const getFirstFeaturedRow = async () => {
      selectPlaylist(dashboardPlaylistIDs[0]).then(r => {
        setRepeatPL(JSON.parse(r).playlist);
      })
  
      selectPlaylist(dashboardPlaylistIDs[1]).then(r => {
        setTopSongsPL(JSON.parse(r).playlist);
      })
  
      selectPlaylist(dashboardPlaylistIDs[2]).then(r => {
        setRewindPL(JSON.parse(r).playlist);
      })
  
      selectPlaylist(dashboardPlaylistIDs[3]).then(r => {
        setCapsulePL(JSON.parse(r).playlist);
      })
    }
    getFirstFeaturedRow();

  }, [])

  const playlistShowcase = featuredPlaylists.map((fpl, idx) => <ShowcasePlaylist key={idx} playlist={fpl} />);

  return (
    dashboardPlaylistIDs && playlistShowcase
      ? <>
        <div className='showcase m20'>
          <h2 className='p5'>Curated just for you.</h2>
          <div className="dash-playlists">
            <ShowcasePlaylist playlist={repeatPL} />
            <ShowcasePlaylist playlist={topSongsPL} />
            <ShowcasePlaylist playlist={rewindPL} />
            <ShowcasePlaylist playlist={capsulePL} />
          </div>
          <br />
          <hr />
          <h2 className='p5'>Expand your horizon.</h2>
          <div className="dash-playlists">
            {playlistShowcase}
          </div>
        </div>
        <div className='p10'>
          <TopTracks />
        </div>
      </>
      : null
  )
}

export default Dashboard
