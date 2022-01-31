import { prisma } from './prisma';

export const getNotifications = async (userID: string) => {
  try {
    // TODO: fix this
    const playlist = await prisma.playlists.findFirst({ where: { userid: userID } });
    if (playlist) {
      return await prisma.suggestions.findMany({
        where: {
          playlistid: playlist.playlistid
        }
      });
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
    return `Failed to update user settings: ${err.message}`;
  }
};
