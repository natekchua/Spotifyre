import React, { useState, useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Avatar } from '@material-ui/core';

import './Profile.css';
  
function Profile (props) {
  const [{
    user,
    curationSettings
  }, dispatch] = useProviderValue();

  const [settings, setSettings] = useState(curationSettings);

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Profile'
    });
  }, [])


  const saveSettings = () => {
    // TODO: send settings object into database for given user.
    dispatch({
      type: 'SET_CURATION_SETTINGS',
      curationSettings: settings
    });  
  }

  return (
    <div className='Profile-container flex-basic'>
      <Avatar id='profileSettingsAvatar' src={user?.images[0].url} />
      <div className='curatorSetting'>
        <div id='avatarInfo-container'>
          <p id='avatarInfoName'>{user?.display_name}</p>
          <p id='avatarInfoNumberOfFollowers'>{user?.followers.total} Followers</p>
        </div>
      </div>

      <div id='enableCuratorMode-container'>
        <div className='curatorSetting'>
          <div>
            <h3 id='curatorSliderHeader'>Enable curator mode</h3>
          </div>

          <div>
            <label className='switch'>
              <input type='checkbox'  id='enableCuratorModeSlider' />
              <div className='slider' />
            </label>
          </div>
        </div>
      </div>

      <div id='curatorSettingsBorder'>
        <div id='curatorSettings-container'>
          <h2 id='curatorSettingsHeader'>Curator settings</h2>

          <form className='totalSuggestionsAllowedSetting'>
            <div className='curatorSetting'>
              <p>Total suggestions allowed</p>
              <input type='number' defaultValue={curationSettings.maxSuggestions} />
            </div>
          </form>

          <form className='maxSuggestionsSetting'>
            <div className='curatorSetting'>
              <p>Max suggestions per user</p>
              <input type='number' defaultValue={curationSettings.suggestionsPerUser} />
            </div>
          </form>
        </div>
      </div>
      <div id='saveProfileSettingsButton-container'>
        <button onClick={saveSettings} id='saveProfileSettingsButton'>SAVE SETTINGS</button>
      </div>
    </div>
  );
}

export default Profile;
