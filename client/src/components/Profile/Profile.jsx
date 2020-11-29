import React, { useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Avatar } from '@material-ui/core';

import './Profile.css';

{/* TODO: obtain profile name and number of followers and enter insert it into
  the avatarInfoName and avatarInfoNumberOfFollowers elements */}
{/* TODO: Make save button save the settings to the DB */}
{/* TODO: Load default settings from DB upon visiting this component into
  the corresponding elements */}
  
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
        <Avatar id="profileSettingsAvatar" src={user?.images[0].url} />
        <div id="avatarInfo-container">
          <p ID="avatarInfoName">Profile Name</p>
          <p ID="avatarInfoNumberOfFollowers">2 Followers</p>
        </div>
      </div>

      <div id="enableCuratorMode-container">
        <div className='curatorSetting'>
          <div>
            <h3 id="curatorSliderHeader">Enable curator mode</h3>
          </div>

          <div>
            <label class="switch">
              <input type="checkbox"  id="enableCuratorModeSlider" />
              <div class="slider" />
            </label>
          </div>
        </div>
      </div>

      <div id="curatorSettingsBorder">
        <div id='curatorSettings-container'>
          <h2 id="curatorSettingsHeader">Curator settings</h2>

          <form className='totalSuggestionsAllowedSetting'>
            <div className='curatorSetting'>
              <p>Total suggestions allowed</p>
              <input type='number' defaultValue="100" />
            </div>
          </form>

          <form className='maxSuggestionsSetting'>
            <div className='curatorSetting'>
              <p>Max suggestions per user</p>
              <input type='number' defaultValue="10" />
            </div>
          </form>

          <form className='onlyFollowerSuggestionsSetting'>
            <div className='curatorSetting'>
              <p>Only followers can suggest</p>
              <label class="switch">
                <input type="checkbox"  id="enableOnlyFollowersCanSuggestSlider" />
                <div class="slider" />
              </label>
            </div>
          </form>

          <form className='autoApproveSetting'>
            <div className='curatorSetting'>
              <p>Auto approve suggestions</p>
              <label class="switch">
                <input type="checkbox"  id="enableAutoApproveSuggestionsSlider" />
                <div class="slider" />
              </label>
            </div>
          </form>
        </div>
      </div>
      <div id='saveProfileSettingsButton-container'>
        <button id='saveProfileSettingsButton'>SAVE SETTINGS</button>
      </div>
    </div>
  );
}

export default Profile;
