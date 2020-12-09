import React from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import { getPlaybackState, playSong } from '../../../services/apiRequests';
import Song from '../../Song/Song';
import { wait } from '../../../services/helperFunctions';

import './SongsResultsList.css';

function SongsResultsList (props) {
  const { songsFromQuery } = props;
  const [{ 
    songsSearchQuery,
    isSongSearching
  }, dispatch] = useProviderValue();

  const onPlaySong = async (safeToPlay = true, id) => {
    if (safeToPlay) {
      await playSong(id)
      await wait(200)
      getPlaybackState().then(res => {
        dispatch({
          type: 'SET_CURR_SONG',
          songObj: res.song?.item
        })
        dispatch({
          type: 'SET_SONG_STATUS',
          isPlaying: res.isPlaying
        })
      })
    }
  }

  const songs = songsFromQuery?.items?.map((s, idx) =>
    <Song song={s} key={idx} onPlaySong={onPlaySong} />
  );

  return (
    <div className='songs-query-results'>
      { isSongSearching 
        ? <>
            <h3>Results found for "{songsSearchQuery}". {songsFromQuery.items.length} songs returned.</h3> 
            {songs}
          </>
        : null
      }
    </div>
  );
}

export default SongsResultsList;
