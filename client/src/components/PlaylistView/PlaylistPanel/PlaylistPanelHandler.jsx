import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useProviderValue } from '../../ContextState/Provider';
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
  const [{ }, dispatch] = useProviderValue();
  const { playlist, curatorView } = props;
  const [tab, setTab] = useState(0);
  const classes = usePlaylistViewStyles();

  useEffect(() => {
    if (curatorView && playlist) {
      dispatch({
        type: 'SET_CURATOR',
        curator: playlist.owner
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
            ? <UserSuggestionsContainer />
            : <CuratorSuggestionsContainer curatorView={curatorView} />
        }
      </PlaylistPanel>
    </div>
  );
}

PlaylistPanelHandler.propTypes = {
  playlist: PropTypes.any,
  curatorView: PropTypes.any
};

export default PlaylistPanelHandler;
