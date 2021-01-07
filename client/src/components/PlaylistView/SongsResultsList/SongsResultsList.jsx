import React from 'react';
import PropTypes from 'prop-types';
import { useProviderValue } from '../../ContextState/Provider';
import { getPlaybackState, playSong } from '../../../services/apiRequests';
import Song from '../../Song/Song';
import { wait } from '../../../services/helperFunctions';

import './SongsResultsList.css';

function SongsResultsList (props) {
  const { songsFromQuery } = props;
  const [{
    songsSearchQuery,
    isSongSearching,
    user
  }, dispatch] = useProviderValue();

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

  const songs = songsFromQuery?.items?.map((s, idx) =>
    <Song song={s} key={idx} onPlaySong={onPlaySong} />
  );

  return (
    <div className='songs-query-results'>
      { isSongSearching
        ? <>
            <h3>Results found for &quot;{songsSearchQuery}&quot;. {songsFromQuery.items.length} songs returned.</h3>
            {songs}
          </>
        : null
      }
    </div>
  );
}

SongsResultsList.propTypes = {
  songsFromQuery: PropTypes.object
};

export default SongsResultsList;
