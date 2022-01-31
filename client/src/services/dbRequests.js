// All api requests involving the Postgres database.
import { apiGet, apiPost } from './helperFunctions';

export const suggestSongToPlaylist = async (params) => {
  return apiPost('/users/suggest-song', params);
};

export const removeSuggestionFromPlaylist = async (params) => {
  return apiPost('/users/remove-suggestion', params);
};

export const getSuggestionsForPlaylist = async (params) => {
  return apiPost('/users/playlist-suggestions', params);
};

export const getNotifications = async (userID) => {
  return apiGet(`/users/get-notifications/${userID}`);
};

export const getCurator = async (name) => {
  return apiGet(`/users/get-curator/${name}`);
};

export const getCurators = async () => {
  return apiGet('/users/get-curators');
};
