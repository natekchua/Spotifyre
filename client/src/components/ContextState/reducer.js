// Reducer to listen for actions.
const reducer = (state, action) => {
  console.log(action);

  switch(action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      };
    case 'SET_TAB':
      return {
        ...state,
        tab: action.tab
      };
    case 'SET_SPOTIFY':
      return {
        ...state,
        token: action.spotify
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'SET_CURATION_SETTINGS':
      return {
        ...state,
        curationSettings: action.curationSettings
      };
    case 'CHECK_SETTINGS':
      return {
        ...state,
        settingsSetByUser: action.settingsSetByUser
      };
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists
      };
    case 'SET_CURR_PLAYLIST':
      return {
        ...state,
        currPlaylist: action.currPlaylist
      };
    case 'SET_CURATOR_PLAYLIST':
      return {
        ...state,
        curatorPlaylist: action.curatorPlaylist
      };
    case 'SET_IS_SEARCHING':
      return {
        ...state,
        isSearching: action.isSearching
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.searchQuery
      };
    case 'SET_PLAYLIST_SEARCH_RESULTS':
      return {
        ...state,
        playlistSearchResults: action.playlistSearchResults
      };
    case 'SET_SONG_STATUS':
      return {
        ...state,
        songStatus: action.isPlaying
      };
    case 'SET_CURR_SONG':
      return {
        ...state,
        currSong: action.songObj
      };
    default:
      return state;
  }
}

export default reducer;
