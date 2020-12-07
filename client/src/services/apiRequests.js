// All API requests to the server.
import { apiGet, apiPost } from './helperFunctions';

export const getLoginURL = async () => {
  return apiGet('/api/authenticate');
};

export const setAccessToken = async (token) => {
  return apiPost('/api/set-access-token', token);
};

export const getSpotify = async () => {
  return apiGet('/api/get-spotify');
};

export const getMe = async () => {
  return apiGet('/api/get-me');
};

export const getUserPlaylists = async () => {
  return apiGet('/api/get-user-playlists');
}

export const getPlaylist = async () => {
  return apiGet('/api/get-playlist');
}

export const selectPlaylist = async (id) => {
  return apiPost('/api/select-playlist', id);
}

export const getPlaybackState = async () => {
  return apiGet('/api/get-playback-state');
}

export const play = async () => {
  return apiGet('/api/play');
};

export const pause = async () => {
  return apiGet('/api/pause');
};

export const goPrevious = async () => {
  return apiGet('/api/previous-song');
};

export const goNext = async () => {
  return apiGet('/api/next-song');
};

export const playSong = async (id) => {
  return apiPost('/api/play-song', id);
};

export const playPlaylist = async (id) => {
  return apiPost('/api/play-playlist', id);
};

export const searchForPlaylists = async (query) => {
  return apiPost('/api/search-for-playlists', query);
};

export const getTopTracks = async () => {
  return apiGet('/api/top-tracks');
}

export const getFeaturedPlaylists = async () => {
  return apiGet('/api/featured-playlists');
}
