import { prisma } from './prisma';
import { PlaylistInfo } from './types';

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
  });
};
