import React from 'react';
import { useInfoStyles } from '../../MUIStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

function InfoModal (props) {
  const { isOpen, closeInfo } = props;
  const classes = useInfoStyles();

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={closeInfo}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      {props.children}
    </Modal>
  );
}

export default InfoModal;
