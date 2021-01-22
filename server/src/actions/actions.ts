import { User } from '../models';
import { SQL } from '../db/sql';
import { AddSongSuggestionParams, AddUserParams, RemoveSongSuggestionParams, TokenData, UpdateUserParams } from './types';

export const getCurators = async (searchString: string) => {
  const query =
    searchString !== 'undefined'
      ? `SELECT * FROM spotifyre.user WHERE "curator_settings" != 'null' AND "name" ILIKE '%${searchString}%'`
      : 'SELECT * FROM spotifyre.user WHERE "curator_settings" != \'null\' AND "name" ILIKE \'%%\'';

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to get curators: ${err.message}`;
  }
};

export const getAllPlaylists = async () => {
  const query = 'SELECT playlistid FROM spotifyre.playlists;';

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to get playlists: ${err.message}`;
  }
};

export const getPlaylistID = async (userID: string) => {
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

export const getPlaylistSuggestions = async (playlistID: string) => {
  const query = `SELECT * FROM spotifyre.suggestions WHERE "playlistid"='${playlistID}';`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to get suggestions: ${err.message}`;
  }
};

export const addCuratorPlaylist = async (playlistID: string, ownerID: string) => {
  const query = `INSERT INTO spotifyre.playlists VALUES ('${playlistID}', '${ownerID}');`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to store song suggestion: ${err.message}`;
  }
};

export const addSongSuggestion = async (params: AddSongSuggestionParams) => {
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

export const removeSongSuggestion = async (params: RemoveSongSuggestionParams) => {
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

export const increaseCount = async (playlistID: string) => {
  const query = `UPDATE spotifyre.suggestions SET count=count+1 WHERE playlistid=${playlistID};`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to increase count: ${err.message}`;
  }
};

export const decreaseCount = async (playlistID: string) => {
  const query = `UPDATE spotifyre.suggestions SET count=count-1 WHERE playlistid=${playlistID};`;

  try {
    const { rows } = await SQL(query);
    return rows;
  } catch (err) {
    console.error(err);
    return `Failed to decrease count: ${err.message}`;
  }
};

// ****** SETTINGS ****** //

export const setTokens = async (data: TokenData, user: User) => {
  const { access_token, refresh_token } = data;
  const selectQuery = `SELECT COUNT(*) FROM spotifyre.user WHERE "userid" = '${user.id}';`;
  const updateQuery =
    `UPDATE spotifyre.user 
      SET "access_token" = '${access_token}', "refresh_token" = '${refresh_token}', "profile_pic" = '${user.images[0].url}', "followers" = '${user.followers.total}'
      WHERE "userid" = '${user.id}';`;

  try {
    const { rows } = await SQL(selectQuery);
    if (Number(rows[0].count) <= 0) {
      // user does not exist
      const params: AddUserParams = {
        userID: user.id,
        name: user.display_name,
        profilePic: user?.images[0]?.url,
        followers: user.followers.total,
        curatorSettings: null,
        accessToken: access_token,
        refreshToken: refresh_token
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

export const getUserToken = async (id: string) => {
  const query = `SELECT "access_token" FROM spotifyre.user WHERE "userid" = '${id}'`;

  try {
    const { rows } = await SQL(query);
    return rows[0].access_token;
  } catch (err) {
    console.error(err);
    return `Failed to get user settings: ${err.message}`;
  }
};

export const getUser = async (id: string) => {
  const query = `SELECT * FROM spotifyre.user WHERE "userid" = '${id}'`;

  try {
    const { rows } = await SQL(query);
    return rows[0];
  } catch (err) {
    console.error(err);
    return `Failed to get user settings: ${err.message}`;
  }
};

export const addUser = async (params: AddUserParams) => {
  const { userID, name, curatorSettings, profilePic, followers, accessToken, refreshToken } = params;
  const query = `INSERT INTO spotifyre.user (userid, name, curator_settings, access_token, refresh_token, profile_pic, followers)
  VALUES('${userID}', '${name}', '${curatorSettings}', '${accessToken}', '${refreshToken}', '${profilePic}', '${followers}');`;

  try {
    const { rows } = await SQL(query);
    return rows[0];
  } catch (err) {
    console.error(err);
    return `Failed to add user: ${err.message}`;
  }
};

export const getUserSettings = async (id: string) => {
  const query = `SELECT "curator_settings" FROM spotifyre.user WHERE "userid" = '${id}'`;

  try {
    const { rows } = await SQL(query);
    return rows[0];
  } catch (err) {
    console.error(err);
    return `Failed to get user settings: ${err.message}`;
  }
};

export const updateUserSettings = async (params: UpdateUserParams) => {
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

export const getNotifications = async (userID: string) => {
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
