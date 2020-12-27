import React, { useEffect } from 'react';
import { useProviderValue } from '../../ContextState/Provider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { getCurators } from '../../../services/dbRequests';
import { useCuratorShowcaseStyles } from '../../../MUIStyles';

import './CuratorShowcase.css';

function CuratorShowcase () {
  const classes = useCuratorShowcaseStyles();
  const [{ curators }, dispatch] = useProviderValue();
  useEffect(() => {
    getCurators().then(res => {
      dispatch({
        type: 'SET_CURATORS',
        curators: res.curators
      });
    });
  }, []);

  return (
    <div className={classes.root}>
    <GridList cellHeight={180} className={classes.gridList}>
      <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        <ListSubheader component="div">December</ListSubheader>
      </GridListTile>
      {curators.map(c => (
        <GridListTile key={c.img}>
          <img src={c.img} alt={c.title} />
          <GridListTileBar
            title={c.title}
            subtitle={<span>by: {c.author}</span>}
            actionIcon={
              <IconButton aria-label={`info about ${c.title}`} className={classes.icon}>
                <InfoIcon />
              </IconButton>
            }
          />
        </GridListTile>
      ))}
    </GridList>
  </div>
  );
}

export default CuratorShowcase;
