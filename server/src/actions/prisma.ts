import { PrismaClient } from '@prisma/client';

/**
 * Singleton instance for `@prisma/client`
 */
export class Prisma {
  private static instance: PrismaClient;

  public static getInstance () {
    if (!Prisma.instance) {
      Prisma.instance = new PrismaClient();
    }

    return Prisma.instance;
  }
}

export const prisma = Prisma.getInstance();
