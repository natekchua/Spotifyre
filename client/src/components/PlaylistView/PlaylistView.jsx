import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import he from 'he';
import SongList from '../SongList/SongList';
import Search from '../Search/Search';

import './PlaylistView.css';

function PlaylistView (props) {
  const { playlist } = props;
  const [{
    playlistSearchResults
  }, dispatch] = useProviderValue();

  return (
    <>
    { playlist
        ? <div className='playlist-container'>
            <div className="playlist-info p10">
              <img src={playlist?.images[0]?.url} alt='' />
              <div className="playlist-text">
                <h1>{playlist?.name}</h1>
                <p>{he.decode(playlist?.description)}</p>
              </div>
            </div>
            <SongList playlist={playlist} />
          </div>
        : <div className='playlist-container'>
            <div className='left-header p5'>
              <Search style={{ width: '100%' }} />
            </div>
            Select a playlist to suggest to!
            { playlistSearchResults?.playlists
                ? <h1>{playlistSearchResults.playlists.items.length} playlists returned.</h1>
                : null
            }
          </div>

    }
    </>
  );
}

export default PlaylistView;
