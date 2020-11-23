import React from 'react';
import './Dashboard.css';

function Dashboard (props) {
  const { spotify } = props;
  return (
    <div className='dashboard-container'>
      <div className='dashboard'>
        <p>Welcome to Spotifyre!</p>
      </div>
    </div>
  )
}

export default Dashboard;
