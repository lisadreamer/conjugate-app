import { Verb } from '@prisma/client'
import { db } from '@/db/index'

export function getTopVerbs(): Promise<Verb[]> {
  return db.verb.findMany()
}

export function searchVerbs(term: string): Promise<Verb[]> {
  return db.verb.findMany({
    where: {
      OR: [{ title: { contains: term } }, { description: { contains: term } }],
    },
  })
}
