import React from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';

function NotificationRow (props) {
  const { notification, onSelectPlaylist } = props;

  return (
    <div className='notification-row' onClick={() => onSelectPlaylist(notification.playlistid)}>
      <p>{notification?.suggested_by_username}&nbsp;suggested the song &quot;{notification?.song_title}&quot; to your playlist &quot;{notification?.playlist}&quot;.</p>
    </div>
  );
}

NotificationRow.propTypes = {
  notification: PropTypes.object,
  onSelectPlaylist: PropTypes.func
};

export default NotificationRow;
