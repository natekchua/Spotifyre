import React, { useState } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import he from 'he';
import PlaylistPanelHandler from './PlaylistPanel/PlaylistPanelHandler';
import PlaylistSearch from '../Search/PlaylistSearch';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PlaylistResultsList from './PlaylistResultsList/PlaylistResultsList';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Badge from '@material-ui/core/Badge';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import {
  getPlaybackState,
  playPlaylist,
  getCuratorPlaylists
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

function CuratorPlaylistView (props) {
  const { playlist } = props;
  const [{ 
    playlistSearchResults,
    isPlaylistSearching,
    curator,
    user
  }, dispatch] = useProviderValue();
  const [curatorPlaylists, setCuratorPlaylists] = useState([]);
  const classes = useStyles();

  const goBackToSearch = () => {
    dispatch({
      type: 'SET_CURATOR_PLAYLIST',
      curatorPlaylist: []
    });
    dispatch({
      type: 'SET_IS_PLAYLIST_SEARCHING',
      isPlaylistSearching: true
    });
  }

  const goBackToCuratorPlaylist = () => {
    setCuratorPlaylists([]);
  }

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

  const seeCuratorsPlaylists = async () => {
    const params = {
      curatorID: curator.id,
      userID: user.id
    };
    getCuratorPlaylists(params).then(res => {
      setCuratorPlaylists(JSON.parse(res).curatorPlaylists)
    })      
  }

  const curatorProfile = (
    <div className='playlist-container'>
      <div className='back-button flex-basic p10' onClick={goBackToCuratorPlaylist}><ArrowBackIcon /></div>
      <PlaylistResultsList playlistsFromQuery={curatorPlaylists} goBackToCuratorPlaylist={goBackToCuratorPlaylist} />
    </div>
  );

  const searchPage = (
    <div className='playlist-container'>
      <PlaylistSearch />
      { playlistSearchResults?.playlists
        ? <PlaylistResultsList playlistsFromQuery={playlistSearchResults.playlists} />
        : <h1 className='flex-basic p20'>Search for a playlist!</h1>
      }
    </div>
  );

  const [helpOpen, setHelpOpen] = useState(false);

  const openHelp = () => setHelpOpen(true);

  const handleClose = () => setHelpOpen(false);

  return (
    <>
      { curatorPlaylists?.items?.length > 0 
        ? <>{curatorProfile}</>
        : playlist && !isPlaylistSearching && !curatorPlaylists?.items?.length
            ? <div className='playlist-container'>
                <Badge className='info-icon' onClick={openHelp} color='secondary'>
                  <InfoOutlinedIcon />
                </Badge>
              <div className="playlist-info p10">
                <img src={playlist?.images[0]?.url} alt='' />
                <div className="playlist-text">
                  <h1>{playlist?.name}</h1>
                  <p>{he.decode(playlist?.description)}</p>
                  <br />
                  <div className='flex-basic'>
                    <p>By:&nbsp;</p><div className='profile-name p10' onClick={seeCuratorsPlaylists}><strong>{playlist?.owner.display_name}</strong></div>
                  </div>
                  <br />
                  <p><strong>{playlist?.tracks.total}</strong> {playlist?.tracks.total === 1 ? 'Song' : 'Songs'}</p>
                  <p><strong>{playlist?.followers.total}</strong> {playlist?.followers.total === 1 ? 'Follower' : 'Followers'}</p>
                  <PlayCircleOutlineIcon onClick={onPlayPlaylist} fontSize='large' className='play-playlist' />
                </div>
                <div className='back-button flex-basic p10' onClick={goBackToSearch}><ArrowBackIcon /></div>
              </div>
              <PlaylistPanelHandler playlist={playlist} curatorView={true} />
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
                Curator's Playlist View
              </h2>
            </div>
            <div id='transition-modal-description'>
              <p>
                On this side of the collaboration mode you can view the <strong>Curator's playlist</strong> where you want to suggest songs to. To view already submitted suggestions click on the <strong>Make a Suggestion</strong> tab.
              </p>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default CuratorPlaylistView;
