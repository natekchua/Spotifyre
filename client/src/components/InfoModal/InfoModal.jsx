import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

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

function InfoModal (props) {
  const { isOpen, closeInfo } = props;
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={closeInfo}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      {props.children}
    </Modal>
  );
}

export default InfoModal;
