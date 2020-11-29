import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import SongList from '../SongList/SongList';

import './PlaylistView.css';

function Playlist (props) {
  const { spotify } = props;
  const [{
    currPlaylist
  }, dispatch] = useProviderValue();

  return (
    <div>
      <div className="playlist-info p10">
        <img src={currPlaylist?.images[0]?.url} alt='' />
        <div className="playlist-text">
          <h1>{currPlaylist?.name}</h1>
          <p>{currPlaylist?.description}</p>
        </div>
      </div>
      <SongList spotify={spotify} currPlaylist={currPlaylist} />
    </div>
  );
}

export default Playlist;
