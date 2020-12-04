const { SQL } = require('../db/sql.js');

const getType = async (userID) => {
  const query = `SELECT user_type FROM spotifyre.user WHERE userid=${userID};`;

  try {
    const { row } = await SQL(query);
    return row[0].user_type;
  } catch (err) {
    console.error(err);
    return `Failed to get user_type: ${err.message}`;
  }
};

const getAllCurators = async () => {
  const query = "SELECT * FROM spotifyre.user WHERE user_type = 'curator';";

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to get curators: ${err.message}`;
  }
};

const getAllPlaylists = async () => {
  const query = 'SELECT playlistid FROM spotifyre.playlists;';

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to get playlists: ${err.message}`;
  }
};

const getPlaylistID = async (userID) => {
  const query = `SELECT playlistid FROM spotifyre.playlists WHERE userid=${userID};`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to get playlist ID: ${err.message}`;
  }
};

const getSuggestions = async (playlistID) => {
  const query = `SELECT songid, suggested_by_userid, playlist, count FROM spotifyre.playlists WHERE playlistid=${playlistID};`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to get suggestions: ${err.message}`;
  }
};

const addSongSuggestion = async (
  playlistID,
  songID,
  suggestedByUserID,
  playlist,
  count
) => {
  const query = `INSERT INTO spotifyre.playlists VALUES (${songID}, ${playlistID}, ${suggestedByUserID}, ${playlist}, ${count});`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to store song suggestion: ${err.message}`;
  }
};

const removeSong = async (playlistID, songID) => {
  const query = `DELETE FROM spotifyre.playlists WHERE playlistid=${playlistID} AND songid=${songID};`;

  try {
    const { row } = await SQL(query);
    return `Removed ${songID} from ${playlistID}`;
  } catch (err) {
    console.error(err);
    return `Failed to remove song: ${err.message}`;
  }
};

const increaseCount = async (playlistID) => {
  const query = `UPDATE spotifyre.suggestions SET count=count+1 WHERE playlistid=${playlistID};`;

  try {
    const { row } = await SQL(query);
    return row;
  } catch (err) {
    console.error(err);
    return `Failed to increase count: ${err.message}`;
  }
};

const decreaseCount = async (playlistID) => {
  const query = `UPDATE spotifyre.suggestions SET count=count-1 WHERE playlistid=${playlistID};`;

  try {
    const { row } = await SQL(query);
    return row;
  } catch (err) {
    console.error(err);
    return `Failed to decrease count: ${err.message}`;
  }
};

module.exports = {
  getType,
  getAllCurators,
  getAllPlaylists,
  getPlaylistID,
  getSuggestions,
  addSongSuggestion,
  removeSong,
  increaseCount,
  decreaseCount,
};
