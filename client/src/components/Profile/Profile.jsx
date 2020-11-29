import React from 'react';

import { Avatar } from '@material-ui/core';

import './Profile.css';

function Profile (props) {
  const { spotify } = props;

  const [{
    user
  }, dispatch] = useProviderValue();

  return (
    <div className='Profile-container'>
        <Avatar src={user?.images[0].url} alt='profile-pic' />

        <label class="switch">
          <input type="checkbox">
            <span class="slider"></span>
        </label>

        <div className='curatorSettings'>
          <h1>CURATION SETTINGS</h1>
          <form className='totalSuggestionsAllowed'>
            <input type=''
        </div>
    </div>
  );
}

export default Dashboard;
