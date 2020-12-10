import React, { useEffect, useState } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { getFeaturedPlaylists } from '../../services/apiRequests';
import ShowcasePlaylist from './Showcase/ShowcasePlaylist';
import TopTracks from './TopTracks/TopTracks';
import Carousel from 'react-elastic-carousel';

import './Dashboard.css'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

function Dashboard () {
  const [{  }, dispatch] = useProviderValue();
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Dashboard'
    });

    getFeaturedPlaylists().then(res => {
      setFeaturedPlaylists(res.featured.playlists.items);
    })
  }, [])

  const playlistShowcase = featuredPlaylists.map((fpl, idx) => <ShowcasePlaylist number={idx+1} key={idx} playlist={fpl} />);

  return (
    playlistShowcase
      ? <>
        <div className='showcase m20'>
          <h2 className='p5'>Expand your horizon.</h2>
          <div className="dash-playlists">
            <Carousel breakPoints={breakPoints}>
              {playlistShowcase}
            </Carousel>
          </div>
        </div>
        <div className='p10'>
          <TopTracks />
        </div>
      </>
      : null
  );
}

export default Dashboard;
