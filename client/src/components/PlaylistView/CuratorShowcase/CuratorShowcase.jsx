import React, { useState, useEffect } from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PlaylistResultsList from '../PlaylistResultsList/PlaylistResultsList';
import { getCurators } from '../../../services/dbRequests';
import { useCuratorShowcaseStyles } from '../../../MUIStyles';
import { getCuratorPlaylists } from '../../../services/apiRequests';

import './CuratorShowcase.css';

function CuratorShowcase () {
  const classes = useCuratorShowcaseStyles();
  const [curatorPlaylists, setCuratorPlaylists] = useState([]);
  const [{ curators, curatorPlaylist, user }, dispatch] = useProviderValue();
  useEffect(() => {
    getCurators().then(res => {
      dispatch({
        type: 'SET_CURATORS',
        curators: res
      });
    });
  }, []);

  const goBackToCuratorMenu = () => {
    setCuratorPlaylists([]);
  };

  const goToCuratorProfile = async (c) => {
    const params = {
      curatorID: c?.userid,
      userID: user.id
    };
    getCuratorPlaylists(params).then(res => {
      setCuratorPlaylists(JSON.parse(res).curatorPlaylists);
      dispatch({
        type: 'SET_CURATOR',
        curator: { display_name: c?.name }
      });
    });
  };

  const curatorProfile = (
    <div>
      <div className='back-button flex-basic p10' onClick={goBackToCuratorMenu}><ArrowBackIcon /></div>
      <PlaylistResultsList playlistsFromQuery={curatorPlaylists} goBackToCuratorPlaylist={goBackToCuratorMenu} fromCuratorMenu={true} />
    </div>
  );

  return (
    <>
      {
        curatorPlaylists?.items?.length > 0
          ? <>{curatorProfile}</>
          : <div className={classes.root}>
              <GridList className={classes.gridList}>
                {curators.map(c => (
                  <GridListTile key={c?.userid} onClick={() => goToCuratorProfile(c)}>
                    <img src={c?.profile_pic} alt={`${c?.name}'s Profile Pic`} />
                    <GridListTileBar
                      title={c?.name}
                      subtitle={<span>Followers: {c?.followers}</span>}
                      actionIcon={
                        <IconButton aria-label={`info about ${c?.name}`} className={classes.icon}>
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
          </div>
      }
    </>
  );
}

export default CuratorShowcase;
