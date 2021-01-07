import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useProviderValue } from '../ContextState/Provider';
import { Route, Redirect } from 'react-router-dom';
import { Alert } from 'antd';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import Collaborate from '../Collaborate/Collaborate';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import {
  getMe,
  getUserPlaylists,
  getPlaylist
} from '../../services/apiRequests';
import { getNotifications, getSettings } from '../../services/dbRequests';

import './AppContainer.css';

function AppContainer (props) {
  const { token } = props;
  const [{ notification, user }, dispatch] = useProviderValue();

  const closeNotification = () => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: null
    });
  };

  useEffect(() => {
    if (token) {
      // Get User Account Details and set user in Context State.
      getMe(token)
        .then(res => {
          const me = JSON.parse(res).me;
          dispatch({
            type: 'SET_USER',
            user: me
          });

          getSettings(me.id)
            .then(res => {
              if (JSON.parse(JSON.parse(res).curator_settings)) {
                const resultObj = JSON.parse(res).curator_settings;
                dispatch({
                  type: 'SET_USER_SETTINGS',
                  userSettings: JSON.parse(resultObj)
                });
                dispatch({
                  type: 'CHECK_USER_SETTINGS',
                  settingsSetByUser: true
                });
              }
            })
            .catch(err => errorHandler(err));

          // Get User Playlists and set user playlists in Context State.
          getUserPlaylists(me.id)
            .then(res => {
              dispatch({
                type: 'SET_PLAYLISTS',
                playlists: res.playlists
              });
            })
            .catch(err => errorHandler(err));

          // Top tracks of 2020 playlist hard-coded for now
          getPlaylist(me.id)
            .then(res => {
              dispatch({
                type: 'SET_CURR_PLAYLIST',
                currPlaylist: res.playlist
              });
            })
            .catch(err => errorHandler(err));

          getNotifications(me.id)
            .then(res => {
              dispatch({
                type: 'SET_SUGGESTION_NOTIFICATIONS',
                suggestionNotifications: res
              });
            })
            .catch(err => errorHandler(err));
        })
        .catch(err => errorHandler(err));
    }
  }, []);

  const errorHandler = err => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: `Oops! ${err}`,
        type: 'error'
      }
    });
  };

  return (
    <div className='AppContainer-container'>
      {notification
        ? <Alert
            className='notification'
            showIcon
            onClose={closeNotification}
            message={notification.message}
            type={notification.type}
            closable
          />
        : null
      }
      {user
        ? <>
            <div className='AppContainer'>
              <Sidebar />
              <div className='Content-container'>
                <Header />
                {props.token ? <Redirect to='/dashboard' /> : null}
                <Route path='/dashboard' render={() => <Dashboard />} />
                <Route path='/collaborate' render={() => <Collaborate />} />
                <Route path='/profile' render={() => <Profile />} />
              </div>
            </div>
            <Footer />
          </>
        : null
      }
    </div>
  );
}

AppContainer.propTypes = {
  token: PropTypes.string
};

export default AppContainer;
