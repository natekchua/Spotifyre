import React, { useState, useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Avatar } from '@material-ui/core';
import { updateCurationSettings } from '../../services/dbRequests';
import { useStyles } from '../InfoModal/styles';
import InfoModal from '../InfoModal/InfoModal';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Fade from '@material-ui/core/Fade';

import 'antd/lib/alert/style/index.css';
import './Profile.css';

function Profile () {
  const classes = useStyles();
  const [{
    user,
    userSettings
  }, dispatch] = useProviderValue();

  const [curatorMode, setCuratorMode] = useState(userSettings.curatorMode);
  const [maxSuggestions, setMaxSuggestions] = useState(userSettings.maxSuggestions);
  const [suggestionsPerUser, setSuggestionsPerUser] = useState(userSettings.suggestionsPerUser);
  const [curatorInfo, setCuratorInfo] = useState(false);

  const openCuratorInfo = () => setCuratorInfo(true);
  const closeCuratorInfo = () => setCuratorInfo(false);

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

  const saveSettings = () => {
    const newCurationSettings = {
      curatorMode: curatorMode,
      maxSuggestions: maxSuggestions,
      suggestionsPerUser: suggestionsPerUser
    };

    const params = { user, newCurationSettings };
    updateCurationSettings(params).then(res => {
      dispatch({
        type: 'SET_USER_SETTINGS',
        userSettings: newCurationSettings
      });
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: {
          message: 'Settings successfully updated.',
          type: 'success'
        }
      });
    }).catch(err => errorHandler(err));
  };

  const toggleCuratorMode = () => {
    setCuratorMode(true); // user can't disable curator mode once it is enabled (for now).
  };

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
      <Avatar id='profile-settings-avatar' src={user?.images[0]?.url} />
      <div className='curator-info'>
        <div id='avatar-info-container'>
          <h3>{user?.display_name}</h3>
          <p>{user?.followers.total} Followers</p>
        </div>
      </div>
      <div className='curator-info p10'>
        <Badge className='profile-info-icon' onClick={openCuratorInfo} color='secondary'>
          <InfoOutlinedIcon />
        </Badge>
        <h3 className='p5'>Curator Mode</h3>
        <Switch
          checked={curatorMode}
          onChange={toggleCuratorMode}
        />
      </div>
      <InfoModal isOpen={curatorInfo} closeInfo={closeCuratorInfo}>
      <Fade in={curatorInfo}>
          <div className={classes.paper}>
            <div className='info-box flex-basic'>
              <h2 className='flex-basic' id='transition-modal-title'>
                Curator Settings
              </h2>
            </div>
            <div id='transition-modal-description'>
              <p>
                Curator mode allows other Spotifyre users to make
                suggestions to your playlists.
                <br style={{ marginBottom: '3px' }} />
                <strong>Max suggestions</strong> is the number of suggestions you can have in total for each of your playlist.
                <br style={{ marginBottom: '3px' }} />
                <strong>Suggestions per user</strong> is the max number of songs another user can suggest for each of your playlists.
              </p>
            </div>
          </div>
        </Fade>
      </InfoModal>
      {
        curatorMode
          ? <div id='curator-settings-container'>
              <div className='profile-sliders'>
                <div className='slider-info flex-basic p10'>
                  <h4>Max Suggestions: </h4>
                  <Slider
                    value={typeof maxSuggestions === 'number' ? maxSuggestions : 0}
                    onChange={handleSliderChange}
                    style={{ width: '200px', color: '#f516e2' }}
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
