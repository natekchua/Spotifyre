import React, { useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Avatar } from '@material-ui/core';

import 'antd/lib/alert/style/index.css';
import './Profile.css';

function Profile () {
  const [{ user }, dispatch] = useProviderValue();

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Profile'
    });
  }, []);

  // awaiting rework
  return (
    <div className='profile-container flex-basic'>
      <Avatar id='profile-settings-avatar' src={user?.images[0]?.url} />
      <div className='curator-info'>
        <div id='avatar-info-container'>
          <h3>{user?.display_name}</h3>
          <p>{user?.followers.total} Followers</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
