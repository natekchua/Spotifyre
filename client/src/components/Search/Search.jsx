import React from 'react'
import './Search.css';
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'

/*Search component
*
* requires:
* message: "" or default message
* setMessage: updates stored message on change function (generally setMessage from hook setState)
* sendMessage: functions that handles request to search by user (recommend to event.ignoreDefault)
* searchMessage: text displayed in search box, defaults to search spotifyre if not passed
*
* uses:
* setMessage(event): call setMessage on changes to update message
* sendMessage(event): on Enter keypress or Icon click calls sendMessage
* */
function Search ({message,setMessage,sendMessage, searchMessage}) {
  if(searchMessage == null){
    searchMessage = "Search Spotifyre"
  }


  return (
    <form className='search' noValidate autoComplete="off">
      <TextField id="filled-basic" label={searchMessage} variant="filled" value={message}
                 onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                 onChange={({target: {value}}) => setMessage(value)}
                 InputProps={{
                   endAdornment: <InputAdornment position="end">
                     <SearchIcon onClick={event => sendMessage(event)}/>
                   </InputAdornment>
                 }}
        />
    </form>
  );
}

export default Search;