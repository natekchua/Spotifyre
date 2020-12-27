import React from 'react';

import './Notifications.css';

function NotificationRow (props) {
  const { notification, onSelectPlaylist } = props;

  return (
    <div className='notification-row' onClick={() => onSelectPlaylist(notification.playlistid)}>
      <p>{notification?.suggested_by_username}&nbsp;suggested the song "{notification?.song_title}" to your playlist "{notification?.playlist}".</p>
    </div>
  );
}

export default NotificationRow;
