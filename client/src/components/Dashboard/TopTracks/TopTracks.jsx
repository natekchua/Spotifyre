import React, { useEffect, useState } from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import { getPlaybackState, playSong, getTopTracks } from '../../../services/apiRequests';
import { wait } from '../../../services/helperFunctions';
import Song from '../../Song/Song';

import './TopTracks.css';

function TopTracks () {
  const [{ user }, dispatch] = useProviderValue();
  const [songs, setSongs] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTopTracks(user.id).then(res => {
      setSongs(res.topTracks);
    }).catch(() => {
      setError('Error: Problem fetching top tracks.');
    });
  }, []);

  const onPlaySong = async (safeToPlay = true, id) => {
    if (safeToPlay) {
      const params = {
        songID: id,
        userID: user.id
      };
      await playSong(params);
      await wait(200);
      getPlaybackState(user.id).then(res => {
        dispatch({
          type: 'SET_CURR_SONG',
          songObj: res.song?.item
        });
        dispatch({
          type: 'SET_SONG_STATUS',
          isPlaying: res.isPlaying
        });
      });
    }
  };

  const songItems = songs?.map((s, idx) => <Song key={idx} song={s} onPlaySong={onPlaySong} />);

  return (
    <div>
      <div className='songs-header p20'>
        <h2>Your Top 10 Tracks</h2>
      </div>
      <>{error || songItems}</>
    </div>
  );
}

export default TopTracks;
