import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Content from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './AppContainer.css';

function AppContainer (props) {
  const { spotify } = props;

  return (
    <div className='AppContainer-container'>
      <div className='AppContainer'>
        <Sidebar />
        <div className='Content-container'>
          <Header spotify={spotify} />
          <Content />
        </div>
      </div>
      <Footer spotify={spotify} />
    </div>
  );
}

export default AppContainer;
