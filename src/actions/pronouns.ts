import { db } from '@/db'
import type { Pronoun } from '@prisma/client'

export async function getPronouns() {
  const pronounsArr = await db.pronoun.findMany()
  return pronounsArr.reduce((acc: Record<number, string>, pronoun: Pronoun) => {
    acc[pronoun.id] = pronoun.name
    return acc
  }, {})
}
