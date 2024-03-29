import { ContextStateReducer } from './types';

// Reducer to listen for actions.
const reducer: ContextStateReducer = (state, action) => {
  // console.log(action); //  used for debugging context state

  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.notification
      };
    case 'SET_SUGGESTION_NOTIFICATIONS':
      return {
        ...state,
        suggestionNotifications: action.suggestionNotifications
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
    case 'SET_USER_SUGGESTIONS':
      return {
        ...state,
        userSuggestions: action.userSuggestions
      };
    case 'SET_CURATOR':
      return {
        ...state,
        curator: action.curator
      };
    case 'SET_CURATOR_SUGGESTIONS':
      return {
        ...state,
        curatorSuggestions: action.curatorSuggestions
      };
    case 'SET_CURATORS':
      return {
        ...state,
        curators: action.curators
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
    case 'SET_IS_PLAYLIST_SEARCHING':
      return {
        ...state,
        isPlaylistSearching: action.isPlaylistSearching
      };
    case 'SET_PLAYLIST_SEARCH_QUERY':
      return {
        ...state,
        playlistSearchQuery: action.playlistSearchQuery
      };
    case 'SET_PLAYLIST_SEARCH_RESULTS':
      return {
        ...state,
        playlistSearchResults: action.playlistSearchResults
      };
    case 'SET_IS_SONG_SEARCHING':
      return {
        ...state,
        isSongSearching: action.isSongSearching
      };
    case 'SET_SONGS_SEARCH_QUERY':
      return {
        ...state,
        songsSearchQuery: action.songsSearchQuery
      };
    case 'SET_SONGS_SEARCH_RESULTS':
      return {
        ...state,
        songsSearchResults: action.songsSearchResults
      };
    case 'SET_IS_CURATOR_SEARCHING':
      return {
        ...state,
        isCuratorSearching: action.isCuratorSearching
      };
    case 'SET_CURATORS_SEARCH_QUERY':
      return {
        ...state,
        curatorsSearchQuery: action.curatorsSearchQuery
      };
    case 'SET_CURATORS_SEARCH_RESULTS':
      return {
        ...state,
        curatorsSearchResults: action.curatorsSearchResults
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
};

export default reducer;
