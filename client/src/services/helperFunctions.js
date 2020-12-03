export const wait = async (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// Parses the access token from the URL
export const getResponseToken = () => {
  return window.location.hash.substring(1).split('&').reduce((init, item) => {
    let queryString = item.split('=');
    init[queryString[0]] = decodeURIComponent(queryString[1]);
    return init;
  }, {})
}

// https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
export const getDuration = (ms) => {
  const mins = Math.floor(ms / 60000);
  const secs = ((ms % 60000) / 1000).toFixed(0)
  return (secs === 60 ? (mins + 1) + ":00" : mins + ":" + (secs < 10 ? "0" : "") + secs);
}
