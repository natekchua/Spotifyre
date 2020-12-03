export const initialState = {
  token: null,
  tab: 'Dashboard',
  spotify: null,
  user: null,
  curationSettings: {
    curatorMode: false,
    maxSuggestions: 100,
    suggestionsPerUser: 10
  },
  playlists: [],
  currPlaylist: null,
  curatorPlaylist: null,
  isSearching: true,
  searchQuery: null,
  playlistSearchResults: [],
  songStatus: false,
  currSong: null
};
