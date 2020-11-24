import React from 'react';
import Header from '../Header/Header';

import './Content.css';

function Content (props) {
  const { spotify } = props;

  return (
    <div className='content'>
      <Header spotify={spotify} />
    </div>
  );
}

export default Content;
