// All api requests involving the Postgres database.
import { apiGet, apiPost } from './helperFunctions';

export const suggestSongToPlaylist = async (params) => {
  return apiPost('/db/suggest-song', params);
};

export const removeSuggestionFromPlaylist = async (params) => {
  return apiPost('/db/remove-suggestion', params);
};

export const getSuggestionsForPlaylist = async (params) => {
  return apiPost('/db/playlist-suggestions', params);
};

export const getNotifications = async (userID) => {
  return apiGet(`/db/get-notifications/${userID}`);
};

export const getCurator = async (name) => {
  return apiGet(`/db/get-curator/${name}`);
};

export const getCurators = async () => {
  return apiGet('/db/get-curators');
};
