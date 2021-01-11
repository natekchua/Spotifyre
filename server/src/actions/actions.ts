import { User } from '../models';
import { SQL } from '../db/sql';
import { PrismaClient } from '@prisma/client';
import { AddSongSuggestionParams, AddUserParams, PlaylistInfo, RemoveSongSuggestionParams, TokenData, UpdateUserParams } from './types';

const prisma = new PrismaClient();

export const getCurators = async (searchString: string) => {
  return await prisma.user.findFirst({
    where: {
      name: {
        contains: searchString !== 'undefined' ? searchString : ''
      },
      curator_settings: {
        not: 'null'
      }
    }
  });
};

export const getAllPlaylists = async () => {
  return await prisma.playlists.findMany();
};

export const getPlaylistID = async (userID: string) => {
  return await prisma.playlists.findFirst({
    where: {
      userid: userID
    }
  })
};

// ****** SUGGESTIONS ****** //

export const getPlaylistSuggestions = async (playlistID: string) => {
  return await prisma.suggestions.findFirst({
    where: {
      playlistid: playlistID
    }
  })
};

export const addCuratorPlaylist = async ({ id, ownerID }: Pick<PlaylistInfo, 'id' | 'ownerID'>) => {
  return await prisma.playlists.create({
    data: {
      playlistid: id,
      user: {
        connect: {
          userid: ownerID,
        }
      }
    }
  })
};

const createSuggestion = async ({ playlistInfo, songInfo, suggestedByUserInfo }: AddSongSuggestionParams) => {
  return await prisma.suggestions.create({
    data: {
      songid: songInfo.id,
      song_title: songInfo.name,
      artist: songInfo.artist,
      album_art: songInfo.albumArt,
      playlist: playlistInfo.name,
      suggested_by_userid: suggestedByUserInfo.id,
      suggested_by_username: suggestedByUserInfo.name,
      count: 1,
      playlists: {
        connect: {
          playlistid: playlistInfo.id,
        }
      }
    }
  });
}

export const addSongSuggestion = async ({ playlistInfo, songInfo, suggestedByUserInfo }: AddSongSuggestionParams) => {
  const playlistCount = await prisma.playlists.count({ where: { playlistid: playlistInfo.id } });

  if (playlistCount > 0) {
    return await createSuggestion({ suggestedByUserInfo, songInfo, playlistInfo });
  } else {
    await addCuratorPlaylist(playlistInfo);
    return await createSuggestion({ suggestedByUserInfo, songInfo, playlistInfo });
  }
};

export const removeSongSuggestion = async ({ songID, playlistID }: RemoveSongSuggestionParams) => {
  return await prisma.suggestions.delete({
    where: {
      songid_playlistid: {
        songid: songID,
        playlistid: playlistID,
      }
    }
  })
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
        profilePic: user.images[0].url,
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
