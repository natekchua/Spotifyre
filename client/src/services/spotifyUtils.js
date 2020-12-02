// Parses the access token from the URL
export const getResponseToken = () => {
  return window.location.hash.substring(1).split('&').reduce((init, item) => {
    let queryString = item.split('=');
    init[queryString[0]] = decodeURIComponent(queryString[1]);
    return init;
  }, {})
}
