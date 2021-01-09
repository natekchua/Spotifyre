import React from 'react';
import PropTypes from 'prop-types';
import UserSuggestions from './UserSuggestions';

import './Suggestions.css';

function UserSuggestionsContainer (props) {
  const { userSettings } = props;
  return (
    <div>
      { userSettings?.curatorMode
        ? <UserSuggestions />
        : <h3 className='flex-basic m30'>
            Enable Curator Mode in your Profile Settings to allow playlist suggestions!
          </h3>
      }
    </div>
  );
}

UserSuggestionsContainer.propTypes = {
  userSettings: PropTypes.object
};

export default UserSuggestionsContainer;
