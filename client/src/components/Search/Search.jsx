import React from 'react';
import { searchForPlaylists } from '../../services/apiRequests';
import { useProviderValue } from '../ContextState/Provider';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import './Search.css'

/*Search component
*
* requires:
* Query: '' or default Query
* setQuery: updates stored Query on change function (generally setQuery from hook setState)
* sendQuery: functions that handles request to search by user (recommend to event.ignoreDefault)
* searchQuery: text displayed in search box, defaults to search spotifyre if not passed
*
* uses:
* setQuery(event): call setQuery on changes to update Query
* sendQuery(event): on Enter keypress or Icon click calls sendQuery
* */
function Search ({ query }) {
  const [{
    
  }, dispatch] = useProviderValue();

  const sendQuery = (q) => {
    searchForPlaylists(q.target.value).then(res => {
      dispatch({
        type: 'SET_SEARCH_QUERY',
        searchQuery: q.target.value
      });
      dispatch({
        type: 'SET_PLAYLIST_SEARCH_RESULTS',
        playlistSearchResults: JSON.parse(res).playlistSearchResults
      });
    });
  }

  const clearSearchResults = () => {
    dispatch({
      type: 'SET_PLAYLIST_SEARCH_RESULTS',
      playlistSearchResults: []
    });
  }
  
  return (
    <div className='search-container flex-basic p5'>
      <TextField 
        className='search-text-field'
        id='filled-basic' label={'Search Spotifyre'} variant='filled' value={query}
        onKeyPress={event => event.key === 'Enter' ? sendQuery(event) : null}
        InputProps={{
          endAdornment: 
            <InputAdornment className='search-icon' position='end'>
              <SearchIcon onClick={event => sendQuery(event)}/>
            </InputAdornment>
          }}
      />
      <div className='search-clear flex-basic m5' onClick={clearSearchResults}>Clear</div>
    </div>
  )
}

export default Search