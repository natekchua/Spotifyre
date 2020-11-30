import React, { useEffect } from 'react';
import { useProviderValue } from '../ContextState/Provider';

import PlaylistView from '../PlaylistView/PlaylistView';

import './Collaborate.css';

function Collaborate (props) {
  const { spotify } = props;
  const [{

  }, dispatch] = useProviderValue();

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Collaborate'
    })
  }, [])

  return (
    <div>
      <PlaylistView />
      {/* TODO: Implement split view and suggestion box component etc. */}
    </div>
  );
}

export default Collaborate;
