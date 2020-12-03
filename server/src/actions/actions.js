const { SQL } = require('../db/sql.js');

module.exports.getType = async (userID) => {
  const query = `SELECT user_type FROM public.user WHERE userid=${userID};`;

  try {
    const { row } = await SQL(query);
    return row[0].user_type;
  } catch (err) {
    console.error(err);
    return `Failed to get user_type: ${err.message}`;
  }
};

module.exports.getAllCurators = async () => {
  const query = "SELECT * FROM public.user WHERE user_type = 'curator';";

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to get curators: ${err.message}`;
  }
};

module.exports.getAllPlaylists = async () => {
  const query = 'SELECT playlistid FROM public.playlists;';

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to get playlists: ${err.message}`;
  }
};

module.exports.getPlaylistID = async (userID) => {
  const query = `SELECT playlistid FROM public.playlists WHERE userid=${userID};`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to get playlist ID: ${err.message}`;
  }
};

module.exports.getSuggestions = async (playlistID) => {
  const query = `SELECT songid, suggested_by_userid, playlist, count FROM public.playlists WHERE playlistid=${playlistID};`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to get suggestions: ${err.message}`;
  }
};

module.exports.addSongSuggestion = async (
  playlistID,
  songID,
  suggestedByUserID,
  playlist,
  count
) => {
  const query = `INSERT INTO public.playlists VALUES (${songID}, ${playlistID}, ${suggestedByUserID}, ${playlist}, ${count});`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to store song suggestion: ${err.message}`;
  }
};

module.exports.removeSong = async (playlistID, songID) => {
  const query = `DELETE FROM public.playlists WHERE playlistid=${playlistID} AND songid=${songID};`;

  try {
    const { row } = await SQL(query);
    return `Removed ${songID} from ${playlistID}`;
  } catch (err) {
    console.error(err);
    return `Failed to remove song: ${err.message}`;
  }
};

module.exports.increaseCount = async (playlistID) => {
  // TODO
};

module.exports.decreaseCount = async (playlistID) => {
  // TODO
};
