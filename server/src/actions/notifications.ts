import { prisma } from './prisma';

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
