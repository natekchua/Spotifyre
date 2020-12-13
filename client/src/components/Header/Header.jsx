import React, { useState } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { getNotifications } from '../../services/dbRequests';
import { Avatar } from '@material-ui/core';
import NotificationList from '../Notifications/NotificationList'
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';

import './Header.css';

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing(2, 4, 3),
  },
}));

function Header () {
  const classes = useStyles();
  const [{
    user,
    tab,
    suggestionNotifications
  }, dispatch] = useProviderValue();
  const [notiPopperOpen, setNotiPopperOpen] = useState(false);

  const openNotifications = () => {
    console.log('open notis')
    setNotiPopperOpen(true);
  }

  const handleClose = () => {
    setNotiPopperOpen(false);
  }

  const refreshNotifications = () => {
    getNotifications(user.id).then(res => {
      dispatch({
        type: 'SET_SUGGESTION_NOTIFICATIONS',
        suggestionNotifications: res
      });
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: {
          message: `Your notifications are now up to date.`,
          type: 'success'
        }
      });
    }).catch(err => errorHandler(err));
  }

  const errorHandler = (err) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: `Oops! ${err}`,
        type: 'error'
      }
    });
  }
  return (
    <>
    <div className='header'>
      <div className='middle-header flex-basic'>
        <h1>{tab}</h1>
      </div>
      <div className='right-header flex-basic' onClick={openNotifications}>
        <Badge className='notification-bell' badgeContent={suggestionNotifications.length} color='secondary'>
          <NotificationsIcon />
        </Badge>
        <Avatar src={user?.images[0].url} alt='profile-pic' />
        <h3 className='ml-10 p5'>{user?.display_name}</h3>
      </div>
    </div>
    <Modal
      className={classes.modal}
      open={notiPopperOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={notiPopperOpen}>
      <div className={classes.paper}>
        <div className='noti-header flex-basic'>
          <h2 className='flex-basic' id="transition-modal-title">Notifications</h2>
          <div className='refresh-icon'><RefreshIcon onClick={refreshNotifications} /></div>
        </div>
        <div id="transition-modal-description">
          <NotificationList notifications={suggestionNotifications} />  
        </div>
      </div>
      </Fade>
    </Modal>
    </>
  )
}

export default Header;
