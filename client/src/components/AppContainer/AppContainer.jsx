import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import Collaborate from '../Collaborate/Collaborate';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './AppContainer.css';

function AppContainer () {
  return (
    <div className='AppContainer-container'>
      <div className='AppContainer'>
        <Sidebar />
        <div className='Content-container'>
          <Header />
          <Route path='/dashboard' render={() => <Dashboard />} />
          <Route path='/collaborate' render={() => <Collaborate />} />
          <Route path='/profile' render={() => <Profile />} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppContainer;
