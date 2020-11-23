import React from 'react';
import spotifyreLogo from '../../icons/spotifyre.png';

import './Sidebar.css';

function Sidebar () {
  return (
    <div className='sidebar flex-basic'>
      <img className='sidebar-logo' src={spotifyreLogo} alt='logo'/>
        <h1>Spotifyre</h1>
    </div>
  );
}

export default Sidebar;
