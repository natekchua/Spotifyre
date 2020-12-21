import React, { useState } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import PlaylistPanelHandler from './PlaylistPanel/PlaylistPanelHandler';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SongResultsList from './SongsResultsList/SongsResultsList';
import SongSearch from '../Search/SongSearch';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import he from 'he';
import { 
  getPlaybackState,
  playPlaylist
} from '../../services/apiRequests';
import { wait } from '../../services/helperFunctions';

import './PlaylistView.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'scroll',
    margin: '0 auto',
  },
  paper: {
    backgroundColor: '#1A1741',
    maxWidth: '800px',
    maxHeight: '800px',
    overflowY: 'scroll',
    color: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function PlaylistView (props) {
  const { playlist } = props;
  const [{ 
    songsSearchResults, 
    isSongSearching,
    user
  }, dispatch] = useProviderValue();
  const classes = useStyles();
  const onPlayPlaylist = async () => {
    const params = {
      playlistID: playlist.id,
      userID: user.id
    }
    await playPlaylist(params);
    await wait(200);
    getPlaybackState(user.id).then(res => {
      dispatch({
        type: 'SET_CURR_SONG',
        songObj: res.song?.item
      });
      dispatch({
        type: 'SET_SONG_STATUS',
        isPlaying: res.isPlaying
      });
    })
  };

  const goToSearch = () => {
    dispatch({
      type: 'SET_IS_SONG_SEARCHING',
      isSongSearching: true
    });
  }

  const searchPage = (
    <div className='playlist-container'>
      <SongSearch />
      { songsSearchResults?.tracks
        ? <SongResultsList songsFromQuery={songsSearchResults.tracks} />
        : <h1 className='flex-basic p20'>Search for a song!</h1>
      }
    </div>
  );

  const [helpOpen, setHelpOpen] = useState(false);

  const openHelp = () => setHelpOpen(true);

  const handleClose = () => setHelpOpen(false);

  return (
    <>
    { !isSongSearching
      ? <div className='playlist-container'>
          <div className='playlist-info p20'>
            <Badge className='info-icon' onClick={openHelp} color='secondary'>
              <InfoOutlinedIcon />
            </Badge>
            <img src={playlist?.images[0]?.url} alt='album-art' />
            <div className='playlist-text'>
              <h1>{playlist?.name}</h1>
              <p>{he.decode(playlist?.description)}</p>
              <br />
              <p>Created by <strong>{playlist?.owner.display_name}</strong></p>
              <p><strong>{playlist?.tracks?.total}</strong> {playlist?.tracks?.total === 1 ? 'Song' : 'Songs'}</p>
              <p><strong>{playlist?.followers?.total}</strong> {playlist?.followers?.total === 1 ? 'Follower' : 'Followers'}</p>
              <PlayCircleOutlineIcon onClick={onPlayPlaylist} fontSize='large' className='play-playlist' />
            </div>
            <div className='back-button flex-basic p10' onClick={goToSearch}><SearchIcon /></div>
          </div>
          <PlaylistPanelHandler playlist={playlist} curatorView={false} />
        </div>
      : <>{searchPage}</>
    }
    <Modal
        className={classes.modal}
        open={helpOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={helpOpen}>
          <div className={classes.paper}>
            <div className='info-box flex-basic'>
              <h2 className='flex-basic' id='transition-modal-title'>
                Playlist View
              </h2>
            </div>
            <div id='transition-modal-description'>
              <p>
                On this side of the collaboration mode you can view your <strong>playlist suggestions</strong>, <strong>search for songs</strong> and <strong>suggest songs</strong> to a curator's playlist. 
                <br />
                To <strong>suggest a song</strong> to a Curator's playlist right click on the song and click Suggest. You will only be able to suggest to the playlist if the user has curator mode enabled. 
                <br />
                <strong>Search for a specific song</strong> that you want to suggest simply by clicking on the Search Button and search for the song. 
              </p>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default PlaylistView;
