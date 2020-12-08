import React, { useState, useEffect } from 'react';
import { getCuratorSettings } from '../../../services/dbRequests';
import { useProviderValue } from '../../ContextState/Provider';
import Suggestions from './Suggestions';

import './Suggestions.css';

function SuggestionsContainer (props) {
  const [{ curator }, dispatch] = useProviderValue();
  const { curationView } = props;
  const [hasCuratorSettings, setHasCuratorSettings] = useState(false);

  useEffect(() => {
    getCuratorSettings(curator.id).then(res => {
      if (res) {
        setHasCuratorSettings(true);
      }
    })
  }, [])

  return (
    <div>
      { hasCuratorSettings
        ? <Suggestions />
        : <h3 className='flex-basic m30'>
            Sorry! You can't suggest to this playlist because the owner has not enabled Curator Mode.
          </h3>
    }
    </div>
  );
}

export default SuggestionsContainer;

