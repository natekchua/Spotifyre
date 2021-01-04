import React, { useState } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import he from 'he';
import PlaylistPanelHandler from './PlaylistPanel/PlaylistPanelHandler';
import PlaylistSearch from '../Search/PlaylistSearch';
import CuratorSearch from '../Search/CuratorSearch';
import PlaylistPanel from '../PlaylistView/PlaylistPanel/PlaylistPanel';
import CuratorShowcase from './CuratorShowcase/CuratorShowcase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PlaylistResultsList from './PlaylistResultsList/PlaylistResultsList';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {
  getPlaybackState,
  playPlaylist,
  getCuratorPlaylists
} from '../../services/apiRequests';
import { wait } from '../../services/helperFunctions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  usePanelStyles,
  usePanelEffectStyles,
  usePlaylistViewStyles,
  tabProps
} from '../../MUIStyles';

import './PlaylistView.css';

const StyledTabs = usePanelStyles(props => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
const StyledTab = usePanelEffectStyles(props => <Tab disableRipple {...props} />);

function CuratorPlaylistView (props) {
  const { playlist } = props;
  const [{
    playlistSearchResults,
    isPlaylistSearching,
    curator,
    user,
    isCuratorSearching
  }, dispatch] = useProviderValue();
  const [curatorPlaylists, setCuratorPlaylists] = useState([]);
  const classes = usePlaylistViewStyles();
  const [tab, setTab] = useState(0);

  const goBackToSearch = () => {
    dispatch({
      type: 'SET_CURATOR_PLAYLIST',
      curatorPlaylist: []
    });
    dispatch({
      type: 'SET_IS_PLAYLIST_SEARCHING',
      isPlaylistSearching: true
    });
  };

  const goBackToCuratorPlaylist = () => {
    setCuratorPlaylists([]);
  };

  const onPlayPlaylist = async () => {
    const params = {
      playlistID: playlist.id,
      userID: user.id
    };
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
    });
  };

  const seeCuratorsPlaylists = async () => {
    const params = {
      curatorID: curator.id,
      userID: user.id
    };
    getCuratorPlaylists(params).then(res => {
      setCuratorPlaylists(JSON.parse(res).curatorPlaylists);
    });
  };

  const onChangeTab = (event, tab) => {
    setTab(tab);
  };

  const curatorProfile = (
    <div className='playlist-container'>
      <div className='back-button flex-basic p10' onClick={goBackToCuratorPlaylist}><ArrowBackIcon /></div>
      <PlaylistResultsList playlistsFromQuery={curatorPlaylists} goBackToCuratorPlaylist={goBackToCuratorPlaylist} />
    </div>
  );

  const curatorMenu = (
    <div className='playlist-container'>
      <div className={classes.playlistViewHeader}>
        <StyledTabs
          value={tab}
          onChange={onChangeTab}
          variant='fullWidth'
        >
          <StyledTab label='Playlist Search' {...tabProps(0)} />
          <StyledTab label={'Curators'} {...tabProps(1)} />
        </StyledTabs>
      </div>
      <PlaylistPanel value={tab} index={0}>
        <PlaylistSearch />
        { playlistSearchResults?.playlists
          ? <PlaylistResultsList playlistsFromQuery={playlistSearchResults.playlists} />
          : <h1 className='flex-basic p20'>Search for a playlist!</h1>
        }
        </PlaylistPanel>
      <PlaylistPanel value={tab} index={1}>
        {isCuratorSearching ? <CuratorSearch /> : null}
        <CuratorShowcase />
      </PlaylistPanel>
    </div>
  );

  return (
    <>
      { curatorPlaylists?.items?.length > 0
        ? <>{curatorProfile}</>
        : playlist && !isPlaylistSearching && !curatorPlaylists?.items?.length
          ? <div className='playlist-container'>
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
          : <>{curatorMenu}</>
      }
    </>
  );
}

export default CuratorPlaylistView;
