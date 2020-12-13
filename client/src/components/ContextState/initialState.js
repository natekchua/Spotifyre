export const initialState = {
  token: null,
  notification: null,
  suggestionNotifications: [],
  tab: 'Dashboard',
  user: null,
  settingsSetByUser: false,
  userSettings: {
    curatorMode: false,
    maxSuggestions: 100,
    suggestionsPerUser: 10
  },
  userSuggestions: [],
  curator: null,
  settingsSetByCurator: false,
  curatorSettings: {
    curatorMode: false,
    maxSuggestions: 100,
    suggestionsPerUser: 10
  },
  curatorSuggestions: [],
  playlists: [],
  currPlaylist: null,
  curatorPlaylist: null,
  isPlaylistSearching: true,
  playlistSearchQuery: null,
  playlistSearchResults: [],
  isSongSearching: false,
  songsSearchQuery: null,
  songsSearchResults: [],
  songStatus: false,
  currSong: null,
  recentSongs: null
};
