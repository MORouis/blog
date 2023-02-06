import { PrismaClient } from "@prisma/client";
let prisma;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
export default prisma;


/*const { PrismaClient } = require("@prisma/client");

global.prisma = global.prisma || new PrismaClient();
const client = global.prisma;

if (process.env.NODE_ENV !== "production") global.prisma = client;

module.exports = client;*/