import React from 'react';
import Suggestions from './Suggestions';

import './Suggestions.css';

function SuggestionsContainer (props) {
  const { curatorView, hasCuratorSettings } = props;

  return (
    <div>
      { curatorView && hasCuratorSettings
        ? <Suggestions />
        : <h3 className='flex-basic m30'>
            Sorry! You can't suggest to this playlist because the owner has not enabled Curator Mode.
          </h3>
    }
    </div>
  );
}

export default SuggestionsContainer;

