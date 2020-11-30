// All API requests to the server.

export const getLoginURL = async () => {
  const response = await fetch('/api/authenticate');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  
  return body;
};

export const setAccessToken = async (token) => {
  const response = await fetch('/api/set-access-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post: token }),
  });
  const body = await response.text();
  return body;
};

export const getSpotify = async () => {
  const response = await fetch('/api/get-spotify');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};

export const getMe = async () => {
  const response = await fetch('/api/get-me');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};

export const getUserPlaylists = async () => {
  const response = await fetch('/api/get-user-playlists');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

export const getPlaylist = async () => {
  const response = await fetch('/api/get-playlist');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

export const selectPlaylist = async (id) => {
  const response = await fetch('/api/select-playlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post: id }),
  });
  const body = await response.text();
  return body;
}

export const getPlaybackState = async () => {
  const response = await fetch('/api/get-playback-state');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

export const play = async () => {
  const response = await fetch('/api/play');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};

export const pause = async () => {
  const response = await fetch('/api/pause');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};

export const goPrevious = async () => {
  const response = await fetch('/api/previous-song');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};

export const goNext = async () => {
  const response = await fetch('/api/next-song');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};

export const playSong = async (id) => {
  const response = await fetch('/api/play-song', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post: id }),
  });
  const body = await response.text();
  return body;
};

export const playPlaylist = async (id) => {
  const response = await fetch('/api/play-playlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post: id }),
  });
  const body = await response.text();
  return body;
};
