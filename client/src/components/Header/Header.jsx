import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Avatar } from '@material-ui/core';

import './Header.css';
import Search from '../Search/Search'

function Header () {
  const [{
    user
  }, dispatch] = useProviderValue();
  
  return (
    <div className='header'>
      <div className='left-header flex-basic p5'>
        <Search/>
      </div>
      <div className='middle-header flex-basic'>
        <h2>Current Tab Here</h2>
      </div>
      <div className='right-header flex-basic'>
        <Avatar src={user?.images[0].url} alt='profile-pic' />
        <h4 className='ml-10 p5'>{user?.display_name}</h4>
      </div>
    </div>
  )
}

export default Header;
