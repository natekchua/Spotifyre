import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import './Search.css.css';

function Search () {
  const [message, setMessage] = useState("");

  function sendMessage (event) {
    event.preventDefault()
    if (message !== "") {
      setMessage("")
      //TODO:call spotify api
    }
  }

  return (
    <form className='search'>
      <input className="inputBox" type="text" placeholder="Search Spotify" value={message}
             onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
             onChange={({target: {value}}) => setMessage(value)}
      />
      <SearchIcon/>
    </form>
  );
}

export default Search;