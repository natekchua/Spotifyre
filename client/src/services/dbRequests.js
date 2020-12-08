// All api requests involving the Postgres database.
import { apiGet, apiPost } from './helperFunctions';

export const getSettings = async (id) => {
  return apiPost('/users/get-settings', id);
}

export const saveCurationSettings = async (params) => {
  return apiPost('/users/save-settings', params);
}

export const updateCurationSettings = async (params) => {
  return apiPost('/users/update-settings', params);
}

export const suggestSongToPlaylist = async (params) => {
  return apiPost('/users/suggest-song', params);
}
