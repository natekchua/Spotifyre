import React, { useState, useEffect } from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import SongList from '../../SongList/SongList';
import PlaylistPanel from './PlaylistPanel';
import Suggestions from '../Suggestions/Suggestions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import './PlaylistPanel.css';

// *** MATERIAL UI TAB STYLING START *** //

const useStyles = makeStyles(() => ({
  playlistViewHeader: { backgroundColor: 'transparent' }
}));

const tabProps = (index) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 200,
      width: '100%',
      backgroundColor: '#d66fe4',
    },
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontFamily: 'Raleway',
    fontSize: theme.typography.pxToRem(16),
    '&:focus': {
      opacity: 1,
    },
  },
}))(props => <Tab disableRipple {...props} />);

// *** MATERIAL UI TAB STYLING END *** //

function PlaylistPanelHandler (props) {
  const [{ curationSettings }, dispatch] = useProviderValue();
  const { playlist, curatorView } = props;
  const [tab, setTab] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    if (curatorView && playlist) {
      dispatch({
        type: 'SET_CURATOR',
        curator: playlist.owner
      })
    }
  }, [])

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
          <SongList playlist={playlist} />
        </PlaylistPanel>
        <PlaylistPanel value={tab} index={1}>
          {
            !curatorView
              ? curationSettings?.curatorMode 
                ? <h3 className='flex-basic m30'>
                    Render suggestions here
                  </h3>
                : <h3 className='flex-basic m30'>
                    Enable Curator Mode in your Profile Settings to allow playlist suggestions!
                  </h3>
              : <Suggestions curatorView={curatorView} />
          }
          </PlaylistPanel>
        
    </div>
  );
}

export default PlaylistPanelHandler;
