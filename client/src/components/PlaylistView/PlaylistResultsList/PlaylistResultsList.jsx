import React from 'react';
import PropTypes from 'prop-types';
import { useProviderValue } from '../../ContextState/Provider';
import { selectPlaylist } from '../../../services/apiRequests';
import PlaylistRow from './PlaylistRow/PlaylistRow';

import './PlaylistResultsList.css';

function PlaylistResultsList (props) {
  const { playlistsFromQuery, goBackToCuratorPlaylist, fromCuratorMenu } = props;
  const [{
    playlistSearchQuery,
    isPlaylistSearching,
    curator,
    user
  }, dispatch] = useProviderValue();

  const onSelectPlaylist = (id) => {
    const params = {
      playlistID: id,
      userID: user.id
    };
    selectPlaylist(params).then(res => {
      dispatch({
        type: 'SET_CURATOR_PLAYLIST',
        curatorPlaylist: JSON.parse(res).playlist
      });
      dispatch({
        type: 'SET_IS_PLAYLIST_SEARCHING',
        isPlaylistSearching: false
      });
      if (goBackToCuratorPlaylist) {
        goBackToCuratorPlaylist();
      }
    }).catch(err => errorHandler(err));
  };

  const errorHandler = (err) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: `Oops! ${err}`,
        type: 'error'
      }
    });
  };

  const playlistRows = playlistsFromQuery?.items?.map((p, idx) =>
    <PlaylistRow
      key={idx}
      playlist={p}
      onSelectPlaylist={onSelectPlaylist}
    />
  );

  return (
    <div className='playlist-query-results'>
      { isPlaylistSearching && !fromCuratorMenu
        ? <h3>Results found for &quot;{playlistSearchQuery}&quot;. {playlistsFromQuery?.items?.length} playlists returned.</h3>
        : <h2 className='center-text p5'>{curator?.display_name}&lsquo;s Public Playlists</h2>
      }
      {playlistRows}
    </div>
  );
}

PlaylistResultsList.propTypes = {
  playlistsFromQuery: PropTypes.any,
  goBackToCuratorPlaylist: PropTypes.func,
  fromCuratorMenu: PropTypes.bool
};

export default PlaylistResultsList;
