import { PrismaClient } from "@prisma/client";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
      // eslint-disable-next-line @typescript-eslint/no-empty-interface
      interface Global {}
    }
}
// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

export const prisma = global.prisma || new PrismaClient(); 

if (process.env.NODE_ENV === "development") {global.prisma = prisma;}
