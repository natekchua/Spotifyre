import React from 'react'
import CuratorSuggestions from './CuratorSuggestions'

import './Suggestions.css'

function CuratorSuggestionsContainer (props) {
  const { curatorView, hasCuratorSettings } = props

  return (
    <div>
      { curatorView && hasCuratorSettings
        ? <CuratorSuggestions />
        : <h3 className='flex-basic m30'>
            Sorry! You can't suggest to this playlist because the owner has not enabled Curator Mode.
          </h3>
      }
    </div>
  )
}

export default CuratorSuggestionsContainer
