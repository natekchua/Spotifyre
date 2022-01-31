import React, { useState, useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Avatar } from '@material-ui/core';
import { useInfoStyles } from '../../MUIStyles';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import 'antd/lib/alert/style/index.css';
import './Profile.css';

function Profile () {
  const classes = useInfoStyles();
  const [{ user }, dispatch] = useProviderValue();

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Profile'
    });
  }, []);

  const errorHandler = (err) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: `Oops! ${err}`,
        type: 'error'
      }
    });
  };

  return (
    <div className='profile-container flex-basic'>
      <Avatar id='profile-settings-avatar' src={user?.images[0]?.url} />
      <div className='curator-info'>
        <div id='avatar-info-container'>
          <h3>{user?.display_name}</h3>
          <p>{user?.followers.total} Followers</p>
        </div>
      </div>
      {/* <div className='p20'> */}
      {/*  <Button onClick={saveSettings} variant='contained' color='secondary'> */}
      {/*    SAVE SETTINGS */}
      {/*  </Button> */}
      {/* </div> */}
    </div>
  );
}

export default Profile;
