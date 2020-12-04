import React from 'react';
import { selectPlaylist} from '../../../services/apiRequests';
import { useProviderValue } from '../../ContextState/Provider';
import { Link } from 'react-router-dom';

import './ShowcasePlaylist.css';

function ShowcasePlaylist (props) {
  const { playlist } = props
  const [{ }, dispatch] = useProviderValue();

  const onSelectPlaylist = (id) => {
    selectPlaylist(id).then(res => {
      dispatch({
        type: 'SET_CURR_PLAYLIST',
        currPlaylist: JSON.parse(res).playlist
      })
    }).catch(err => console.log(err))
  };

  return (
    <>
      <Link to={'/collaborate'}> 
        <img className='dash-playlist-info' src={playlist?.images[0]?.url} alt='album-art' onClick={() => onSelectPlaylist(playlist.id)} />
      </Link>
    </>
  );
}

export default ShowcasePlaylist;
