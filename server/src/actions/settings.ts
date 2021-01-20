import { User } from '../models';
import { prisma } from './prisma';
import { AddUserParams, TokenData, UpdateUserParams } from './types';
import { addUser, getUser } from './user';

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

export const getUserSettings = async (id: string) => {
  try {
    const { curator_settings } = await getUser(id);
    if (curator_settings) {
      return curator_settings;
    } else {
      return { curator_settings: '' };
    }
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
