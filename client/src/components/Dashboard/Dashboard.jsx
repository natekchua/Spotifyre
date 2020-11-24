import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Content from '../MainContent/Content';
import Footer from '../Footer/Footer';

import './Dashboard.css';

function Dashboard (props) {
  const { spotify } = props;

  return (
    <div className='dashboard-container'>
      <div className='dashboard'>
        <Sidebar />
        <Content />
      </div>
      <Footer spotify={spotify} />
    </div>
  );
}

export default Dashboard;
