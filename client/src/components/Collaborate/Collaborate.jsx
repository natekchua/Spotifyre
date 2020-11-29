import React from 'react';
import PlaylistView from '../PlaylistView/PlaylistView';

import './Collaborate.css';

function Collaborate (props) {
  const { spotify } = props;
  return (
    <div>
      <PlaylistView spotify={spotify} />
      {/* TODO: Implement split view and suggestion box component etc. */}
    </div>
  )
}

export default Collaborate;
