import { PrismaClient } from "@prisma/client";

// var prisma: PrismaClient | undefined;

// export var prisma = global.prisma || new PrismaClient();
export var prisma = new PrismaClient();

// if (process.env.NODE_ENV !== 'production') global.prisma = prisma;