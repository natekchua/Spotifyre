import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import Header from '../Header/Header';
import SongList from '../SongList/SongList';

import './Content.css';

function Content (props) {
  const { spotify } = props;
  const [{ 
    currPlaylist
  }, dispatch] = useProviderValue();

  return (
    <div className='content'>
      <Header spotify={spotify} />
      <div className="content-info p10">
        <img src={currPlaylist?.images[0].url} alt='' />
        <div className="content-text">
          <h1>{currPlaylist?.name}</h1>
          <p>{currPlaylist?.description}</p>  
        </div>
      </div>
      <SongList currPlaylist={currPlaylist} />
    </div>
  );
}

export default Content;
