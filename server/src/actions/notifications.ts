import { prisma } from './prisma';

/**
 * `select * from spotifyre.suggestions where playlistid in (
 *    select playlistid from spotifyre.playlists where userid = 'my_userid'
 *  )`
 *
 * @param userID
 * @returns
 */
export async function getNotifications (userID: string) {
  try {
    return await prisma.playlists.findMany({
      where: {
        userid: userID
      },
      include: {
        suggestions: true
      }
    });
  } catch (err) {
    console.error(err);
    return `Failed to update user settings: ${err.message}`;
  }
}
