import { prisma } from './prisma';
import { AddUserParams } from './types';

export const getCurator = async (name: string) => {
  return await prisma.user.findFirst({
    where: {
      name: {
        contains: name !== 'undefined' ? name : ''
      }
    }
  });
};

export const getCurators = async () => {
  return await prisma.user.findMany();
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
  const { userID: userid, name, profilePic: profile_pic, followers, accessToken: access_token, refreshToken: refresh_token } = params;

  try {
    return await prisma.user.create({
      data: {
        userid,
        name,
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
