import { prisma } from './prisma';
import type { suggestions } from '@prisma/client';

/**
 * @param userID
 * @returns list of suggestions/notifications sent to specified user
 */
export async function getNotifications (
  userID: string
): Promise<suggestions[] | Error> {
  try {
    const result = await prisma.playlists.findMany({
      where: {
        userid: userID
      },
      include: {
        suggestions: true
      }
    });

    return result.flatMap(({ suggestions }) => suggestions);
  } catch (err) {
    console.error(err);
    return new Error(`Failed to get user's notifications: ${err.message}`);
  }
}
