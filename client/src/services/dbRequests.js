// All api requests involving the Postgres database.
import { apiGet, apiPost } from './helperFunctions';

export const getCurationSettings = async () => {
  return apiGet('/db/get-settings');
}

export const saveCurationSettings = async () => {
  return apiPost('/db/save-settings');
}
