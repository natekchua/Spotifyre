// All API requests to the server.
import { apiGet, apiPost } from './helperFunctions';

export const getAuthURL = async () => {
  return apiGet('/api/authorize');
};

export const getToken = async (code) => {
  return apiPost('/api/handle-token', { code }, false);
};

export const getMe = async (accessToken) => {
  return apiPost('/api/get-me', { accessToken }, false);
};

export const getUserPlaylists = async (userID) => {
  return apiGet(`/api/get-user-playlists/${userID}`);
};

export const getCuratorPlaylists = async (params) => {
  return apiPost('/api/get-curator-playlists', params);
};

export const getPlaylist = async (userID) => {
  return apiGet(`/api/get-playlist/${userID}`);
};

export const selectPlaylist = async (id) => {
  return apiPost('/api/select-playlist', id);
};

export const getPlaybackState = async (userID) => {
  return apiGet(`/api/get-playback-state/${userID}`);
};

export const play = async (userID) => {
  return apiGet(`/api/play/${userID}`);
};

export const pause = async (userID) => {
  return apiGet(`/api/pause/${userID}`);
};

export const goPrevious = async (userID) => {
  return apiGet(`/api/previous-song/${userID}`);
};

export const goNext = async (userID) => {
  return apiGet(`/api/next-song/${userID}`);
};

export const playSong = async (id) => {
  return apiPost('/api/play-song', id);
};

export const playPlaylist = async (params) => {
  return apiPost('/api/play-playlist', params);
};

export const searchForSongs = async (params) => {
  return apiPost('/api/search-for-songs', params);
};

export const searchForPlaylists = async (params) => {
  return apiPost('/api/search-for-playlists', params);
};

export const getTopTracks = async (userID) => {
  return apiGet(`/api/top-tracks/${userID}`);
};

export const getFeaturedPlaylists = async (userID) => {
  return apiGet(`/api/featured-playlists/${userID}`);
};

export const addTrackToPlaylist = async (params) => {
  return apiPost('/api/add-track-to-playlist', params);
};
