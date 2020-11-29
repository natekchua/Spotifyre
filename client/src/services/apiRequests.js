// All API requests to the server.

export const getLoginURL = async () => {
  const response = await fetch('/api/authenticate');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  
  return body;
};
