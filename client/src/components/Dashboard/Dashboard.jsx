import React, { useEffect } from 'react'
import { useProviderValue } from '../ContextState/Provider'
import './Dashboard.css'
import PlaylistOption from '../Sidebar/Option/PlaylistOption'

function Dashboard (props) {
  // const [dispatch] = useProviderValue()
  const { spotify } = props
  const [{ playlists }, dispatch] = useProviderValue()

  const selectPlaylist = (id) => {
    spotify.getPlaylist(id).then(playlist => {
      dispatch({
        type: 'SET_CURR_PLAYLIST',
        currPlaylist: playlist
      })
    })
  }

  useEffect(() => {
    dispatch({
      type: 'SET_TAB',
      tab: 'Dashboard'
    })

    //  TODO: get recently played and curator playlists to display

  }, [])

  const playlistOptions = playlists?.items?.map((p, idx) =>
    <PlaylistOption
      key={idx}
      optionName={p.name}
      playlist={p}
      onSelectPlaylist={selectPlaylist}
    />
  )

  const recentlyPlayed = () => {
    //  https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
    //   const songs = currPlaylist?.tracks.items.map((s, idx) => <Song key={idx} song={s.track} onPlaySong={playSong} />)
  }

  return (
    <>
      <div>
        Top Playlist
        <div>
          {/*TODO:get top playlist from database? */}
        </div>
      </div>
      <div>
        Recommended Playlists
        <div>
          {/*TODO: get suggested playlist*/}
        </div>
      </div>
      <div>
        Recently Played Songs
        <div>
          {/*TODO:get recently played songs from spotify */}
        </div>
      </div>
    </>
  )
}

export default Dashboard
