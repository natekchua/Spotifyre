import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import Collaborate from '../Collaborate/Collaborate';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './AppContainer.css';

function AppContainer (props) {
  const { spotify } = props;

  return (
    <Router>
      <div className='AppContainer-container'>
        <div className='AppContainer'>
          <Sidebar spotify={spotify} />
          <div className='Content-container'>
            <Header spotify={spotify} />
            <Route path='/dashboard' exact render={() => <Dashboard spotify={spotify} />} />
            <Route path='/collaborate' render={() => <Collaborate spotify={spotify} />} />
            <Route path='/profile' render={() => <Profile />} />
          </div>
        </div>
        <Footer spotify={spotify} />
      </div>
    </Router>
  );
}

export default AppContainer;
