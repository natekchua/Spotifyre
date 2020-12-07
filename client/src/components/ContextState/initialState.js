export const initialState = {
  token: null,
  tab: 'Dashboard',
  spotify: null,
  user: null,
  settingsSetByUser: false,
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
  currSong: null,
  dashboardPlaylistIDs: [
    '37i9dQZF1EphOfEPXi5KfT',
    '37i9dQZF1EM18g3xzTa0Pw',
    '37i9dQZF1CApPEHPqCGz0p',
    '37i9dQZF1EuIxSCUbcUAge'
  ],
  recentSongs: null
};
