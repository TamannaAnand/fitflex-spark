import { PrismaClient } from '@prisma/client';

// Check if the global object exists (Node.js environment)
const globalForPrisma = typeof global !== 'undefined' ? (global as unknown as { prisma: PrismaClient }) : undefined;

export const prisma = globalForPrisma?.prisma || new PrismaClient();

if (globalForPrisma && process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
