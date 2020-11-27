import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import SongList from '../SongList/SongList';

import './Dashboard.css';

function Dashboard (props) {
  const { spotify } = props;
  const [{
    currPlaylist
  }, dispatch] = useProviderValue();

  return (
    <div className='Dashboard'>
      <div className="dashboard-info p10">
        <img src={currPlaylist?.images[0].url} alt='' />
        <div className="dashboard-text">
          <h1>{currPlaylist?.name}</h1>
          <p>{currPlaylist?.description}</p>
        </div>
      </div>
      <SongList currPlaylist={currPlaylist} />
    </div>
  );
}

export default Dashboard;
