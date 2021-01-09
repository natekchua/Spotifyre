import React from 'react';
import PropTypes from 'prop-types';
import CuratorSuggestions from './CuratorSuggestions';

import './Suggestions.css';

function CuratorSuggestionsContainer (props) {
  const { curatorView, hasCuratorSettings } = props;

  return (
    <div>
      { curatorView && hasCuratorSettings
        ? <CuratorSuggestions />
        : <h3 className='flex-basic m30'>
            Sorry! You can&lsquo;t suggest to this playlist because the owner has not enabled Curator Mode.
          </h3>
      }
    </div>
  );
}

CuratorSuggestionsContainer.propTypes = {
  curatorView: PropTypes.any,
  hasCuratorSettings: PropTypes.any
};

export default CuratorSuggestionsContainer;
