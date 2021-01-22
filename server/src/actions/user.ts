import { prisma } from './prisma';
import { AddUserParams } from './types';

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
