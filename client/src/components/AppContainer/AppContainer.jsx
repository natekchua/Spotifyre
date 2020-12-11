import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { Route, Redirect } from 'react-router-dom';
import { Alert } from 'antd';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import Collaborate from '../Collaborate/Collaborate';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './AppContainer.css';

function AppContainer (props) {
  const [{ notification, user }, dispatch] = useProviderValue();

  const closeNotification = () => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: null
    });
  }

  return (
    <div className='AppContainer-container'>
      { notification
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
      { user
        ? <>
          <div className='AppContainer'>
            <Sidebar />
            <div className='Content-container'>
              <Header />
              { props.token ? <Redirect to='/dashboard' /> : null }
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

export default AppContainer;
