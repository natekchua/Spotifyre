import React from 'react';
import { useProviderValue } from '../ContextState/Provider';
import Song from '../Song/Song';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import './SongList.css';

function SongList (props) {
  const { currPlaylist } = props;
  const [{
    spotify
  }, dispatch] = useProviderValue();

  const playSong = (id) => {  // WIP
    console.log(id)
    spotify?.play({ uris: [`spotify:track:${id}`] }).then((res) => {
      console.log(res)
      spotify?.getMyCurrentPlayingTrack().then(song => {
        dispatch({
          type: 'SET_CURR_SONG',
          currSong: {
            playStatus: song.is_playing,
            songObj: song.item
          }
        });
      });
    });
  }

  const songs = currPlaylist?.tracks.items.map((s, idx) => <Song key={idx} song={s.track} onPlaySong={playSong} />)

  return (
    <div className='songs-container'>
      <div className='song-icons'>
        <PlayCircleOutlineIcon fontSize='large' className='shuffle' />
        <StarBorderIcon fontSize='large' />
        <MoreHorizIcon fontSize='large'/>
      </div>
      {songs}
    </div>
  )
}

export default SongList;
