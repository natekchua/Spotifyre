import React, { useState, useEffect } from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import { getSettings } from '../../../services/dbRequests';
import SongList from '../../SongList/SongList';
import PlaylistPanel from './PlaylistPanel';
import UserSuggestionsContainer from '../Suggestions/UserSuggestionsContainer';
import CuratorSuggestionsContainer from '../Suggestions/CuratorSuggestionsContainer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import {
  usePanelStyles,
  usePanelEffectStyles,
  usePlaylistViewStyles,
  tabProps
} from '../../../MUIStyles';

import './PlaylistPanel.css';

const StyledTabs = usePanelStyles(props => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
const StyledTab = usePanelEffectStyles(props => <Tab disableRipple {...props} />);

function PlaylistPanelHandler (props) {
  const [{
    userSettings,
    settingsSetByCurator
  }, dispatch] = useProviderValue();
  const { playlist, curatorView } = props;
  const [tab, setTab] = useState(0);
  const classes = usePlaylistViewStyles();

  useEffect(() => {
    if (curatorView && playlist) {
      dispatch({
        type: 'SET_CURATOR',
        curator: playlist.owner
      });
      getSettings(playlist.owner.id).then(res => {
        if (res) {
          const resultObj = JSON.parse(res).curator_settings;
          dispatch({
            type: 'SET_CURATOR_SETTINGS',
            curatorSettings: JSON.parse(resultObj)
          });
          dispatch({
            type: 'CHECK_CURATOR_SETTINGS',
            settingsSetByCurator: true
          });
        } else {
          dispatch({
            type: 'SET_CURATOR_SETTINGS',
            curatorSettings: []
          });
          dispatch({
            type: 'CHECK_CURATOR_SETTINGS',
            settingsSetByCurator: false
          });
        }
      });
    }
  }, []);

  const onChangeTab = (event, tab) => {
    setTab(tab);
  };

  return (
    <div>
      <div className={classes.playlistViewHeader}>
        <StyledTabs
          value={tab}
          onChange={onChangeTab}
          variant='fullWidth'
          centered
        >
          <StyledTab icon={<LibraryMusicIcon />} label='Songs' {...tabProps(0)} />
          <StyledTab
            icon={<ThumbsUpDownIcon />}
            label={curatorView ? 'Make a Suggestion' : 'Suggestions'} {...tabProps(1)}
          />
        </StyledTabs>
      </div>
      <PlaylistPanel value={tab} index={0}>
        <SongList playlist={playlist} curatorView={curatorView} />
      </PlaylistPanel>
      <PlaylistPanel value={tab} index={1}>
        {
          !curatorView
            ? <UserSuggestionsContainer userSettings={userSettings} />
            : <CuratorSuggestionsContainer curatorView={curatorView} hasCuratorSettings={settingsSetByCurator} />
        }
      </PlaylistPanel>
    </div>
  );
}

export default PlaylistPanelHandler;
