import { User } from '../models';
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
  });
};

// ****** SUGGESTIONS ****** //

export const getPlaylistSuggestions = async (playlistID: string) => {
  return await prisma.suggestions.findFirst({
    where: {
      playlistid: playlistID
    }
  });
};

export const addCuratorPlaylist = async ({ id, ownerID }: Pick<PlaylistInfo, 'id' | 'ownerID'>) => {
  return await prisma.playlists.create({
    data: {
      playlistid: id,
      user: {
        connect: {
          userid: ownerID
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
};

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
  });
};

// ****** SETTINGS ****** //

export const setTokens = async (data: TokenData, user: User) => {
  const { access_token, refresh_token } = data;

  try {
    const userCount = await prisma.user.count({
      where: {
        userid: user.id
      }
    });

    if (!userCount) {
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
      return await prisma.user.update({
        where: {
          userid: user.id
        },
        data: {
          access_token,
          refresh_token,
          profile_pic: user?.images[0]?.url
        }
      });
    }
  } catch (err) {
    console.error(err);
    return `Failed to set user tokens: ${err.message}`;
  }
};

export const getUserToken = async (id: string) => {
  try {
    const user = await getUser(id);
    return user.access_token;
  } catch (err) {
    console.error(err);
    return `Failed to get user settings: ${err.message}`;
  }
};

export const getUser = async (id: string) => {
  try {
    return await prisma.user.findUnique({ where: { userid: id } });
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to find a user with id "${id}"`);
  }
};

export const addUser = async (params: AddUserParams) => {
  const { userID: userid, name, curatorSettings: curator_settings, profilePic: profile_pic, followers, accessToken: access_token, refreshToken: refresh_token } = params;

  try {
    return await prisma.user.create({
      data: {
        userid,
        name,
        curator_settings,
        profile_pic,
        followers,
        access_token,
        refresh_token
      }
    });
  } catch (err) {
    console.error(err);
    return `Failed to add user: ${err.message}`;
  }
};

export const getUserSettings = async (id: string) => {
  try {
    const { curator_settings } = await getUser(id);
    return curator_settings;
  } catch (err) {
    console.error(err);
    return `Failed to get user settings: ${err.message}`;
  }
};

export const updateUserSettings = async (params: UpdateUserParams) => {
  const { user, newCurationSettings } = params;
  try {
    return await prisma.user.update({
      where: {
        userid: user.id
      },
      data: {
        curator_settings: JSON.stringify(newCurationSettings)
      }
    });
  } catch (err) {
    console.error(err);
    return `Failed to update user settings: ${err.message}`;
  }
};

export const getNotifications = async (userID: string) => {
  try {
    const { playlistid } = await prisma.playlists.findFirst({ where: { userid: userID } });
    return await prisma.suggestions.findMany({
      where: {
        playlistid
      }
    });
  } catch (err) {
    console.error(err);
    return `Failed to update user settings: ${err.message}`;
  }
};
