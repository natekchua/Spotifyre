import React, { useState, useEffect } from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PlaylistResultsList from '../PlaylistResultsList/PlaylistResultsList';
import { getCurators } from '../../../services/dbRequests';
import { getCuratorPlaylists } from '../../../services/apiRequests';

import './CuratorShowcase.css';

function CuratorShowcase () {
  const [curatorPlaylists, setCuratorPlaylists] = useState<any>([]);
  const [{ curators, user }, dispatch] = useProviderValue();
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
    dispatch({
      type: 'SET_IS_CURATOR_SEARCHING',
      isCuratorSearching: true
    });
  };

  const goToCuratorProfile = async (c: any) => {
    const params = {
      curatorID: c?.userid,
      userID: user.id
    };
    const res = await getCuratorPlaylists(params);
    setCuratorPlaylists(JSON.parse(res).curatorPlaylists);
    dispatch({
      type: 'SET_CURATOR',
      curator: { display_name: c?.name }
    });
    dispatch({
      type: 'SET_IS_CURATOR_SEARCHING',
      isCuratorSearching: false
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
        curatorPlaylists?.items?.length >= 0
          ? <>{curatorProfile}</>
          : <div className='root'>
              <Grid
                container
                spacing={3}
                direction='row'
                justify='center'
                alignItems='center'
              >
                {curators?.map((c, idx) => (
                  <Grid
                    className='avatar-container'
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    key={idx}
                  >
                    <Avatar alt={`${c?.name}'s Profile Pic`} src={c?.profile_pic} className='avatar' onClick={() => goToCuratorProfile(c)} />
                    <h4>{c?.name}</h4>
                    <h5>Followers: {c?.followers}</h5>
                  </Grid>
                ))}
              </Grid>
            </div>
      }
    </>
  );
}

export default CuratorShowcase;
