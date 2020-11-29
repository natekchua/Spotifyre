import React, { useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Avatar } from '@material-ui/core';

import './Profile.css';

function Profile (props) {
  const [{
    user
  }, dispatch] = useProviderValue();

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Profile'
    })
  }, [])

  return (
    <div className='Profile-container'>
      <div className='curatorSetting'>
        <Avatar src={user?.images[0].url} alt='profile-pic' />
        <div id="avatarInfo-container">
          <p>Profile Name</p>
          <p>Number of followers</p>
        </div>
      </div>

      <form className="switch">
        <div className='curatorSetting'>
          <h1 id="curatorSliderHeader">Become a curator</h1>
          <input type="checkbox" className="slider">
          </input>
        </div>
      </form>

      <div className='curatorSettings-container'>
        <h1 id="curatorSettingsHeader">CURATION SETTINGS</h1>
        <form className='totalSuggestionsAllowedSetting'>
          <div className='curatorSetting'>
            <p>Total suggestions allowed</p>
            <input type='text'>
            </input>
          </div>
        </form>

        <form className='maxSuggestionsSetting'>
          <div className='curatorSetting'>
            <p>Max suggestions per user</p>
            <input type='text'>
            </input>
          </div>
        </form>

        <form className='onlyFollowerSuggestionsSetting'>
          <div className='curatorSetting'>
            <p>Only followers can suggest</p>
            <input type='checkbox'>
            </input>
          </div>
        </form>

        <form className='autoApproveSetting'>
          <div className='curatorSetting'>
            <p>Auto approve suggestions</p>
            <input type='checkbox'>
            </input>
          </div>
        </form>

        <button className='saveCuratorSettings'>
        SAVE
        </button>
      </div>
    </div>
  );
}

export default Profile;
