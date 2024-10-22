import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

async function main() {
  const verbs = await db.verb.findMany();
  console.log(verbs);
}

/*main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })*/

