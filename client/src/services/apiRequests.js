// All API requests to the server.

const apiGet = async (path) => {
  const response = await fetch(path);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  
  return body;
}

const apiPost = async (path, item) => {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post: item }),
  });
  const body = await response.text();
  return body;
}

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