import React from 'react';
import { selectPlaylist} from '../../../services/apiRequests';
import { useProviderValue } from '../../ContextState/Provider';
import { Link } from 'react-router-dom';

import './ShowcasePlaylist.css';

function ShowcasePlaylist (props) {
  const { playlist } = props
  const [{ user }, dispatch] = useProviderValue();

  const onSelectPlaylist = (id) => {
    const params = {
      playlistID: id,
      userID: user.id
    };
    selectPlaylist(params).then(res => {
      dispatch({
        type: 'SET_CURR_PLAYLIST',
        currPlaylist: JSON.parse(res).playlist
      })
    }).catch(err => errorHandler(err))
  };

  const errorHandler = (err) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: `Oops! ${err}`,
        type: 'error'
      }
    });
  }

  return (
    <>
      <Link to={'/collaborate'}> 
        <img className='dash-playlist-info' src={playlist?.images[0]?.url} alt='album-art' onClick={() => onSelectPlaylist(playlist.id)} />
      </Link>
    </>
  );
}

export default ShowcasePlaylist;
