import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

/*db.verb.create({
  data: {
    title: "test",
    description: "test",
  },
});*/
