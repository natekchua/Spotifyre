export const initialState = {
  token: null,
  tab: 'Dashboard',
  spotify: null,
  user: null,
  settingsSetByUser: false,
  userSettings: {
    curatorMode: false,
    maxSuggestions: 100,
    suggestionsPerUser: 10
  },
  curator: null,
  settingsSetByCurator: false,
  curatorSettings: {
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
  currSong: null,
  recentSongs: null
};
