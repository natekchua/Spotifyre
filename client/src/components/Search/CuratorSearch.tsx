/* eslint-disable no-empty-pattern */
import React from 'react';
import { getCurators } from '../../services/dbRequests';
import { useProviderValue } from '../ContextState/Provider';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CuratorSearchProps } from './types';

import './Search.css';

function CuratorSearch (props: CuratorSearchProps) {
  const { query } = props;
  const [{ }, dispatch] = useProviderValue();

  const sendQuery = (q: any) => {
    if (q.target.value) {
      getCurators(q.target.value).then(res => {
        dispatch({
          type: 'SET_CURATORS_SEARCH_QUERY',
          curatorsSearchQuery: q.target.value
        });
        dispatch({
          type: 'SET_CURATORS_SEARCH_RESULTS',
          curatorsSearchResults: res
        });
        dispatch({
          type: 'SET_CURATORS',
          curators: res
        });
      });
    }
  };

  const clearSearchResults = () => {
    getCurators().then(res => {
      dispatch({
        type: 'SET_CURATORS',
        curators: res
      });
    });
  };

  return (
    <div className='search-container flex-basic p5'>
      <TextField
        className='search-text-field'
        id='filled-basic' label={'Search Curators'} variant='filled' value={query}
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
  );
}

export default CuratorSearch;
