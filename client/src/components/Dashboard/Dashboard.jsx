import React, { useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';

import './Dashboard.css';

function Dashboard () {
  const [{
    tab
  }, dispatch] = useProviderValue();

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Dashboard'
    })
  }, [])

  return (
    <div>
      Welcome to your {tab}!
    </div>
  )
}

export default Dashboard;
