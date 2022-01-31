import React from 'react';
import PropTypes from 'prop-types';
import CuratorSuggestions from './CuratorSuggestions';

import './Suggestions.css';

function CuratorSuggestionsContainer (props) {
  const { curatorView } = props;

  return (
    <div>
      <CuratorSuggestions />
    </div>
  );
}

CuratorSuggestionsContainer.propTypes = {
  curatorView: PropTypes.any
};

export default CuratorSuggestionsContainer;
