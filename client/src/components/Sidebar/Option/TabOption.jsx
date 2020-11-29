import React from 'react';
import { Link } from 'react-router-dom';

import './Option.css';

function TabOption (props) {
  const {
    optionName,
    Icon
  } = props;

  return (
    <div className='option flex-basic p5'>
      { Icon && <Icon className='option-icon pr10' />}
      { Icon ? <h4>{optionName}</h4> : <h5>{optionName}</h5> }
    </div>
  );
}

export default TabOption;
