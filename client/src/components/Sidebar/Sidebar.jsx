import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import spotifyreLogo from '../../icons/spotifyre.png';
import Option from './Option/Option';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import FaceIcon from '@material-ui/icons/Face';

import './Sidebar.css';

function Sidebar () {
  const [{ playlists }, dispatch] = useProviderValue();

  const playlistOptions = playlists?.items?.map(p => <Option optionName={p.name} />);

  return (
    <div className='sidebar'>
      <div className='sidebar-title flex-basic p20'>
        <img className='sidebar-logo' src={spotifyreLogo} alt='logo'/>
        <h1>Spotifyre</h1>
      </div>
      <Option optionName='Dashboard' Icon={DashboardIcon} />
      <Option optionName='Collaborate' Icon={PeopleIcon}/>
      <Option optionName='Profile' Icon={FaceIcon}/>
      <br />
      <strong className='sidebar-plist-title p10'>Playlists</strong>
      <hr />
      {playlistOptions}
    </div>
  );
}

export default Sidebar;
