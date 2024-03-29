export const wait = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// Parse the authorization code from the URL
export const getCode = () => {
  const url = new URL(window.location.href);
  return url.searchParams.get('code');
};

// https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
export const getDuration = (ms) => {
  const mins = Math.floor(ms / 60000);
  const secs = ((ms % 60000) / 1000).toFixed(0);
  return secs === 60
    ? mins + 1 + ':00'
    : mins + ':' + (secs < 10 ? '0' : '') + secs;
};

// Helpers for API requests.
export const apiGet = async (path) => {
  // Prod environment
  const prod = {
    urlPath: 'https://spotifyre.herokuapp.com' + path
  };

  // local dev environment
  const dev = {
    urlPath: path
  };

  const config = process.env.NODE_ENV === 'development' ? dev : prod;

  const response = await fetch(config.urlPath);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body;
};

export const apiPost = async (path, item) => {
  // Prod environment
  const prod = {
    urlPath: 'https://spotifyre.herokuapp.com' + path
  };

  // local dev environment
  const dev = {
    urlPath: path
  };

  const config = process.env.NODE_ENV === 'development' ? dev : prod;

  const response = await fetch(config.urlPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post: item })
  });
  const body = await response.text();
  return body;
};
