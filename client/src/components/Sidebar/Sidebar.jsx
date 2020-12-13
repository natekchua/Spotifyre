import React from 'react';
import { Link } from 'react-router-dom';
import { useProviderValue } from '../ContextState/Provider';
import spotifyreLogo from '../../icons/spotifyre.png';
import TabOption from './Option/TabOption';
import PlaylistOption from './Option/PlaylistOption';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import FaceIcon from '@material-ui/icons/Face';
import { selectPlaylist } from '../../services/apiRequests';

import './Sidebar.css';

function Sidebar () {
  const [{ playlists, user }, dispatch] = useProviderValue();

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

  const playlistOptions = playlists?.items?.map((p, idx) =>
    <PlaylistOption
      key={idx}
      optionName={p.name}
      playlist={p}
      onSelectPlaylist={onSelectPlaylist}
    />
  );

  return (
    <div className='sidebar'>
      <div className='sidebar-title flex-basic p20'>
        <img className='sidebar-logo' src={spotifyreLogo} alt='logo'/>
        <h1>Spotifyre</h1>
      </div>
      <Link to={'/dashboard'} className='option-link'><TabOption optionName='Dashboard' Icon={DashboardIcon} /></Link>
      <Link to={'/collaborate'} className='option-link'><TabOption optionName='Collaborate' Icon={PeopleIcon} /></Link>
      <Link to={'/profile'} className='option-link'><TabOption optionName='Profile' Icon={FaceIcon} /></Link>
      <br />
      <strong className='sidebar-plist-title p10'>My Playlists</strong>
      <hr />
      <div className='sidebar-playlists'>
        {playlistOptions}
      </div>
    </div>
  );
}

export default Sidebar;
