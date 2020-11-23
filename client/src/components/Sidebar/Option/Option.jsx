import React from 'react';
import './Option.css';

function Option (props) {
  const {
    optionName,
    Icon
  } = props;

  return (
    <div className='option flex-basic'>
      { Icon && <Icon className='option-icon p10' />}
      { Icon ? <h4>{optionName}</h4> : <h5>{optionName}</h5> }
    </div>
  );
}

export default Option;
