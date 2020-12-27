import React from 'react';
import { searchForSongs } from '../../services/apiRequests';
import { useProviderValue } from '../ContextState/Provider';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InputAdornment from '@material-ui/core/InputAdornment';

import './Search.css';

function SongSearch ({ query }) {
  const [{ user }, dispatch] = useProviderValue();

  const sendQuery = (q) => {
    const params = {
      query: q.target.value,
      userID: user.id
    };
    searchForSongs(params).then(res => {
      dispatch({
        type: 'SET_SONGS_SEARCH_QUERY',
        songsSearchQuery: q.target.value
      });
      dispatch({
        type: 'SET_SONGS_SEARCH_RESULTS',
        songsSearchResults: JSON.parse(res).songsSearchResults
      });
    });
  };

  const clearSearchResults = () => {
    dispatch({
      type: 'SET_SONGS_SEARCH_RESULTS',
      songsSearchResults: []
    });
  };

  const goBackToPlaylist = () => {
    dispatch({
      type: 'SET_IS_SONG_SEARCHING',
      isSongSearching: false
    });
  };

  return (
    <div className='search-container flex-basic p5'>
      <TextField
        className='search-text-field'
        id='filled-basic' label={'Search Songs'} variant='filled' value={query}
        onKeyPress={event => event.key === 'Enter' ? sendQuery(event) : null}
        InputProps={{
          endAdornment:
            <InputAdornment className='search-icon' position='end'>
              <SearchIcon onClick={event => sendQuery(event)}/>
            </InputAdornment>
        }}
      />
      <div className='search-clear flex-basic m5' onClick={clearSearchResults}>Clear</div>
      <div className='song-search-back-button flex-basic' onClick={goBackToPlaylist}><ArrowBackIcon /></div>
    </div>
  );
}

export default SongSearch;
