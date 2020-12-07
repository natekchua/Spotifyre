import React, { useState, useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Avatar } from '@material-ui/core';
import { 
  saveCurationSettings,
  updateCurationSettings
} from '../../services/dbRequests';
import { Alert } from 'antd';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import 'antd/lib/alert/style/index.css';
import './Profile.css';

function Profile () {
  const [{
    user,
    curationSettings,
    settingsSetByUser
  }, dispatch] = useProviderValue();

  const [curatorMode, setCuratorMode] = useState(curationSettings.curatorMode);
  const [maxSuggestions, setMaxSuggestions] = useState(curationSettings.maxSuggestions);
  const [suggestionsPerUser, setSuggestionsPerUser] = useState(curationSettings.suggestionsPerUser);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Profile'
    });
  }, [])


  const saveSettings = () => {
    const newCurationSettings = {
      curatorMode: curatorMode,
      maxSuggestions: maxSuggestions,
      suggestionsPerUser: suggestionsPerUser
    };

    const params = { user, newCurationSettings };
    if (!settingsSetByUser) {
      saveCurationSettings(params).then(res => {
        console.log(res)
        dispatch({
          type: 'SET_CURATION_SETTINGS',
          curationSettings: newCurationSettings
        });
        setNotification('saved');
      }).catch(err => {
        setNotification('error');
        console.log(err)
      });
    } else {
      updateCurationSettings(params).then(res => {
        console.log(res)
        dispatch({
          type: 'SET_CURATION_SETTINGS',
          curationSettings: newCurationSettings
        });
        setNotification('updated');
      }).catch(err => {
        setNotification('error');
        console.log(err)
      });
    }
  }

  const toggleCuratorMode = () => {
    setCuratorMode(true);             // user can't disable curator mode once it is enabled (for now).
  }

  const handleSliderChange = (event, newValue) => {
    setMaxSuggestions(newValue);
  };

  const handleBlur = () => {
    if (maxSuggestions < 0) {
      setMaxSuggestions(0);
    } else if (maxSuggestions > 100) {
      setMaxSuggestions(100);
    }
  };

  const handleSliderChangeV2 = (event, newValue) => {
    setSuggestionsPerUser(newValue);
  };


  const handleBlurV2 = () => {
    if (suggestionsPerUser < 0) {
      setSuggestionsPerUser(0);
    } else if (suggestionsPerUser > 100) {
      setSuggestionsPerUser(100);
    }
  };

  return (
    <div className='profile-container flex-basic'>
      { notification === 'error' 
        ? <Alert
            showIcon
            onClose={() => setNotification('')}
            message='Failed to save settings.' type='error' closable />
        : null } 
      { notification === 'saved' 
        ? <Alert
            showIcon
            onClose={() => setNotification('')}
            message='Settings successfully saved.' type='success' closable />
        : null }
      { notification === 'updated' 
        ? <Alert
            showIcon
            onClose={() => setNotification('')}
            message='Settings successfully updated.' type='success' closable />
        : null }
      <Avatar id='profile-settings-avatar' src={user?.images[0].url} />
      <div className='curator-info'>
        <div id='avatar-info-container'>
          <h3>{user?.display_name}</h3>
          <p>{user?.followers.total} Followers</p>
        </div>
      </div>
      <div className='curator-info p10'>
        <h3 className='p5'>Curator Mode</h3>
        <Switch
          checked={curatorMode}
          onChange={toggleCuratorMode}
        />
      </div>
      {
        curatorMode
          ? <div id='curator-settings-container'>
              <div className='profile-sliders'>
                <div className='slider-info flex-basic p10'>
                  <h4>Max Suggestions: </h4>
                  <Slider
                    value={typeof maxSuggestions === 'number' ? maxSuggestions : 0}
                    onChange={handleSliderChange}
                    style={{ width: '200px',  color: '#f516e2' }}
                  />
                  <Input
                    value={maxSuggestions}
                    margin='dense'
                    onBlur={handleBlur}
                    inputProps={{
                      step: 10,
                      min: 0,
                      max: 100,
                      type: 'number'
                    }}
                  />
                </div>
                <div className='slider-info flex-basic p10'>
                  <h4>Suggestions / User: </h4>
                  <Slider
                    value={typeof suggestionsPerUser === 'number' ? suggestionsPerUser : 0}
                    onChange={handleSliderChangeV2}
                    aria-labelledby='input-slider'
                    style={{ width: '190px', color: '#f516e2' }}
                  />
                  <Input
                    value={suggestionsPerUser}
                    margin='dense'
                    onBlur={handleBlurV2}
                    inputProps={{
                      step: 2,
                      min: 0,
                      max: 20,
                      type: 'number'
                    }}
                  />
                </div>    
              </div>
          </div>
        : <h2>Enable Curator Mode to adjust your playlist suggestion settings.</h2>
      }
      <div className='p20'>
        <Button onClick={saveSettings} variant='contained' color='secondary'>
          SAVE SETTINGS
        </Button>
      </div>
    </div>
  );
}

export default Profile;
