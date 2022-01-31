import { User } from '../models';
import { prisma } from './prisma';
import { AddUserParams, TokenData } from './types';
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
        profilePic: user?.images[0]?.url,
        followers: user.followers.total,
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
