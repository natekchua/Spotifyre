import React from 'react'
import NotificationRow from './NotificationRow'
import { selectPlaylist } from '../../services/apiRequests'
import { useProviderValue } from '../ContextState/Provider'

function NotificationList (props) {
  const { notifications } = props
  const [{ user, tab }, dispatch] = useProviderValue()

  const onSelectPlaylist = (id) => {
    const params = {
      playlistID: id,
      userID: user.id
    }
    selectPlaylist(params).then(res => {
      dispatch({
        type: 'SET_CURR_PLAYLIST',
        currPlaylist: JSON.parse(res).playlist
      })
    }).catch(err => errorHandler(err))
    if (tab !== 'Collaborate') {
      dispatch({
        type: 'SET_TAB',
        tab: 'Collaborate'
      })
    }
  }

  const errorHandler = (err) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: `Oops! ${err}`,
        type: 'error'
      }
    })
  }

  const notiDisplay = notifications?.map((n, idx) => {
    return <NotificationRow notification={n} key={idx} onSelectPlaylist={onSelectPlaylist} />
  })

  return (
    <div>
      { notifications.length > 0
        ? <>{notiDisplay}</>
        : <h3>You have no song suggestions.</h3>
      }

    </div>
  )
}

export default NotificationList
