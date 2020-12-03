import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Avatar } from '@material-ui/core';

import './Header.css';

function Header () {
  const [{
    user,
    tab
  }, dispatch] = useProviderValue();
  
  return (
    <div className='header'>
      <div className='middle-header flex-basic'>
        <h1>{tab}</h1>
      </div>
      <div className='right-header flex-basic'>
        <Avatar src={user?.images[0].url} alt='profile-pic' />
        <h3 className='ml-10 p5'>{user?.display_name}</h3>
      </div>
    </div>
  )
}

export default Header;
