// All API requests to the server.
import { apiGet, apiPost } from './helperFunctions';

// API Route

export const getAuthURL = async () => {
  return apiGet('/api/authorize');
};

export const getToken = async (code) => {
  return apiPost('/api/handle-token', code);
};

// User Route

export const getMe = async (token) => {
  return apiPost('/user/get-me', token);
};

export const getTopTracks = async (userID) => {
  return apiGet(`/user/top-tracks/${userID}`);
};

// Playlist Route

export const getUserPlaylists = async (userID) => {
  return apiGet(`/playlist/get-user-playlists/${userID}`);
};

export const getCuratorPlaylists = async (params) => {
  return apiPost('/playlist/get-curator-playlists', params);
};

export const getPlaylist = async (userID) => {
  return apiGet(`/playlist/get-playlist/${userID}`);
};

export const selectPlaylist = async (id) => {
  return apiPost('/playlist/select-playlist', id);
};

export const getFeaturedPlaylists = async (userID) => {
  return apiGet(`/playlist/featured-playlists/${userID}`);
};

export const addTrackToPlaylist = async (params) => {
  return apiPost('/playlist/add-track-to-playlist', params);
};

export const searchForSongs = async (params) => {
  return apiPost('/playlist/search-for-songs', params);
};

export const searchForPlaylists = async (params) => {
  return apiPost('/playlist/search-for-playlists', params);
};
// Player Route

export const getPlaybackState = async (userID) => {
  return apiGet(`/player/get-playback-state/${userID}`);
};

export const play = async (userID) => {
  return apiGet(`/player/play/${userID}`);
};

export const pause = async (userID) => {
  return apiGet(`/player/pause/${userID}`);
};

export const goPrevious = async (userID) => {
  return apiGet(`/player/previous-song/${userID}`);
};

export const goNext = async (userID) => {
  return apiGet(`/player/next-song/${userID}`);
};

export const playSong = async (id) => {
  return apiPost('/player/play-song', id);
};

export const playPlaylist = async (params) => {
  return apiPost('/player/play-playlist', params);
};
