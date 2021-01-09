import React from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';

function NotificationRow (props) {
  const { notification, onSelectPlaylist } = props;

  return (
    <div className='notification-row' onClick={() => onSelectPlaylist(notification.playlistid)}>
      <p>{`${notification?.suggested_by_username} suggested the song "${notification?.song_title}" to your playlist "${notification?.playlist}".`}</p>
    </div>
  );
}

NotificationRow.propTypes = {
  notification: PropTypes.object,
  onSelectPlaylist: PropTypes.func
};

export default NotificationRow;
