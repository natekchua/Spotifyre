import React, { useState } from 'react';
import { useProviderValue } from '../ContextState/Provider';
import { getNotifications } from '../../services/dbRequests';
import { useStyles } from '../InfoModal/styles'
import InfoModal from '../InfoModal/InfoModal'
import { Avatar } from '@material-ui/core';
import NotificationList from '../Notifications/NotificationList'
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Fade from '@material-ui/core/Fade';
import RefreshIcon from '@material-ui/icons/Refresh';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import './Header.css';

function Header () {
  const [{
    user,
    tab,
    suggestionNotifications
  }, dispatch] = useProviderValue();
  const [notiPopperOpen, setNotiPopperOpen] = useState(false);
  const [collaborateInfo, setCollaborateInfo] = useState(false);
  const classes = useStyles();

  const openNotifications = () => setNotiPopperOpen(true);
  const closeNotifications = () => setNotiPopperOpen(false);
  const openCollaborateInfo = () => setCollaborateInfo(true);
  const closeCollaborateInfo = () => setCollaborateInfo(false);

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
        { tab === 'Collaborate' 
          ? <Badge className='info-icon' onClick={openCollaborateInfo} color='secondary'>
              <InfoOutlinedIcon />
            </Badge>
          : null
        }
      </div>
      <div className='right-header flex-basic' onClick={openNotifications}>
        <Badge className='notification-bell' badgeContent={suggestionNotifications.length} color='secondary'>
          <NotificationsIcon />
        </Badge>
        <Avatar src={user?.images[0]?.url} alt='profile-pic' />
        <h3 className='ml-10 p5'>{user?.display_name}</h3>
      </div>
    </div>
    <InfoModal isOpen={collaborateInfo} closeInfo={closeCollaborateInfo}>
      <Fade in={collaborateInfo}>
        <div className={classes.paper}>
          <div className='info-box flex-basic'>
            <h2 className='flex-basic' id='transition-modal-title'>
              Collaborate Playlist Info
            </h2>
          </div>
          <div id='transition-modal-description'>
            <p>
              Collaboration mode allows you to view your <strong>playlist suggestions</strong>, <strong>search for songs</strong> and <strong>suggest songs</strong> to a curator's playlist. 
              <br />
              <br style={{ marginBottom: '4px' }}/>
              On <strong>right side</strong> of the collaboration mode you can view the <strong>Curator's playlist</strong> where you want to suggest songs to. To view already submitted suggestions click on the <strong>Make a Suggestion</strong> tab.
            </p>
          </div>
        </div>
      </Fade>
    </InfoModal>
    <InfoModal isOpen={notiPopperOpen} closeInfo={closeNotifications} title='Notifications'>
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
    </InfoModal>
    </>
  )
}

export default Header;
