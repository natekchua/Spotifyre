import { makeStyles, withStyles } from '@material-ui/core/styles';

// This files contains resuable Material UI styled classes.

// *** INFO MODAL STYLES START *** //
export const useInfoStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'scroll',
    margin: '0 auto'
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
    padding: theme.spacing(2, 4, 3)
  }
}));
// *** INFO MODAL STYLES END *** //

// *** PLAYLIST PANEL STYLES START *** //
export const usePlaylistViewStyles = makeStyles(() => ({
  playlistViewHeader: { backgroundColor: 'transparent' }
}));

export const tabProps = (index) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  };
};

export const usePanelStyles = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 200,
      width: '100%',
      backgroundColor: '#d66fe4'
    }
  }
});

export const usePanelEffectStyles = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontFamily: 'Raleway',
    fontSize: theme.typography.pxToRem(16),
    '&:focus': {
      opacity: 1
    }
  }
}));
// *** PLAYLIST PANEL STYLES END *** //
