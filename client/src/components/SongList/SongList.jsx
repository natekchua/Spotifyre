import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import Song from '../Song/Song';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import './SongList.css';

function SongList (props) {
  const { spotify } = props;
  const [{
    currPlaylist
  }, dispatch] = useProviderValue();

  const playPlaylist = (id) => {
    spotify.play({ context_uri: `spotify:playlist:37i9dQZF1EpmFBY9P2HI7S` })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((song) => {
          dispatch({
            type: 'SET_SONG_STATUS',
            isPlaying: true
          });
          dispatch({
            type: 'SET_CURR_SONG',
            songObj: song.item
          });
        });
      });
  };

  const playSong = (id) => {
    console.log(spotify, id)
    spotify?.play({ uris: [`spotify:track:${id}`] })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((song) => {
          dispatch({
            type: 'SET_SONG_STATUS',
            isPlaying: true
          });
          dispatch({
            type: 'SET_CURR_SONG',
            songObj: song.item
          });
        });
      });
  };

  const songs = currPlaylist?.tracks.items.map((s, idx) => <Song key={idx} song={s.track} onPlaySong={playSong} />)

  return (
    <div className='songs-container'>
      <div className='song-icons'>
        <PlayCircleOutlineIcon onClick={playPlaylist} fontSize='large' className='shuffle' />
        <StarBorderIcon fontSize='large' />
        <MoreHorizIcon fontSize='large'/>
      </div>
      {songs}
    </div>
  )
}

export default SongList;
