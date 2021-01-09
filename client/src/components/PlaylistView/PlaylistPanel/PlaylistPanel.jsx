import React from 'react';
import PropTypes from 'prop-types';

function PlaylistPanel (props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (<div>{children}</div>)}
    </div>
  );
}

PlaylistPanel.propTypes = {
  children: PropTypes.any,
  value: PropTypes.any,
  index: PropTypes.any
};

export default PlaylistPanel;
