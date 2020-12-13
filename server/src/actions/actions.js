const { SQL } = require('../db/sql.js');

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

// ****** SUGGESTIONS ****** //

const getPlaylistSuggestions = async (playlistID) => {
  const query = `SELECT * FROM spotifyre.suggestions WHERE "playlistid"='${playlistID}';`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to get suggestions: ${err.message}`;
  }
};

const addCuratorPlaylist = async (playlistID, ownerID) => {
  const query = `INSERT INTO spotifyre.playlists VALUES ('${playlistID}', '${ownerID}');`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to store song suggestion: ${err.message}`;
  }
};

const addSongSuggestion = async (params) => {
  const { songInfo, playlistInfo, suggestedByUserInfo } = params;
  const selectQuery = `select * from spotifyre.playlists where "playlistid" = '${playlistInfo.id}';`; // check if curator playlist exists
  const insertQuery = `INSERT INTO spotifyre.suggestions
   VALUES ('${songInfo.id}', '${playlistInfo.id}', '${suggestedByUserInfo.id}', '${playlistInfo.name}', 1,
    '${songInfo.name}', '${songInfo.artist}', '${songInfo.albumArt}', '${suggestedByUserInfo.name}');`;

  try {
    const { rows } = await SQL(selectQuery);
    if (rows.length > 0) {
      // playlist exists
      const { rows } = await SQL(insertQuery);
      return rows;
    } else {
      await addCuratorPlaylist(playlistInfo.id, playlistInfo.ownerID); // if it doesn't exist, add it into the DB
      const { rows } = await SQL(insertQuery);
      return rows;
    }
  } catch (err) {
    console.error(err);
    return `Failed to store song suggestion: ${err.message}`;
  }
};

const removeSongSuggestion = async (params) => {
  const { songID, playlistID } = params;
  const query = `DELETE FROM spotifyre.suggestions WHERE "songid"='${songID}' AND "playlistid"='${playlistID}';`;

  try {
    const { rows } = await SQL(query);
    return rows;
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

// ****** SETTINGS ****** //

const setTokens = async (data, user) => {
  const { access_token, refresh_token } = data;
  const selectQuery = `SELECT COUNT(*) FROM spotifyre.user WHERE "userid" = '${user.id}';`;
  const updateQuery = `UPDATE spotifyre.user SET "access_token" = '${access_token}', "refresh_token" = '${refresh_token}'
    WHERE "userid" = '${user.id}';`;
  try {
    const { rows } = await SQL(selectQuery);
    if (Number(rows[0].count) <= 0) {
      // user does not exist
      const params = {
        userID: user.id,
        name: user.display_name,
        curatorSettings: null,
        accessToken: access_token,
        refreshToken: refresh_token,
      };
      await addUser(params);
    } else {
      const { rows } = await SQL(updateQuery);
      return rows[0];
    }
  } catch (err) {
    console.error(err);
    return `Failed to set user tokens: ${err.message}`;
  }
};

const getUserToken = async (id) => {
  const query = `SELECT "access_token" FROM spotifyre.user WHERE "userid" = '${id}'`;

  try {
    const { rows } = await SQL(query);
    return rows[0].access_token;
  } catch (err) {
    console.error(err);
    return `Failed to get user settings: ${err.message}`;
  }
};

const getUser = async (id) => {
  const query = `SELECT * FROM spotifyre.user WHERE "userid" = '${id}'`;

  try {
    const { rows } = await SQL(query);
    return rows[0];
  } catch (err) {
    console.error(err);
    return `Failed to get user settings: ${err.message}`;
  }
};

const addUser = async (params) => {
  const { userID, name, curatorSettings, accessToken, refreshToken } = params;
  const query = `INSERT INTO spotifyre.user (userid, name, curator_settings, access_token, refresh_token)
  VALUES('${userID}', '${name}', '${curatorSettings}', '${accessToken}', '${refreshToken}');`;

  try {
    const { rows } = await SQL(query);
    return rows[0];
  } catch (err) {
    console.error(err);
    return `Failed to add user: ${err.message}`;
  }
};

const getUserSettings = async (id) => {
  const query = `SELECT "curator_settings" FROM spotifyre.user WHERE "userid" = '${id}'`;

  try {
    const { rows } = await SQL(query);
    return rows[0];
  } catch (err) {
    console.error(err);
    return `Failed to get user settings: ${err.message}`;
  }
};

const updateUserSettings = async (params) => {
  const { user, newCurationSettings } = params;
  const curationSettingsStr = JSON.stringify(newCurationSettings);

  const query = `UPDATE spotifyre.user SET "curator_settings" = '${curationSettingsStr}' WHERE "userid" = '${user.id}';`;

  try {
    const { rows } = await SQL(query);
    return rows[0];
  } catch (err) {
    console.error(err);
    return `Failed to update user settings: ${err.message}`;
  }
};

const getNotifications = async (userID) => {
  const query = `SELECT * FROM spotifyre.suggestions WHERE "playlistid" in (
      SELECT "playlistid" FROM spotifyre.playlists WHERE "userid" = '${userID}'
    );`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to update user settings: ${err.message}`;
  }
};

module.exports = {
  getAllCurators,
  getAllPlaylists,
  getPlaylistID,
  getPlaylistSuggestions,
  addSongSuggestion,
  removeSongSuggestion,
  increaseCount,
  decreaseCount,
  setTokens,
  getUserToken,
  getUser,
  addUser,
  getUserSettings,
  updateUserSettings,
  getNotifications,
};
