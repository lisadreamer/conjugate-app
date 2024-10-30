import Link from 'next/link'
import { Verb } from '@prisma/client'

interface VerbsListProps {
  fetchData: () => Promise<Verb[]>
}

export default async function VerbsList({ fetchData }: VerbsListProps) {
  const verbs = await fetchData()

  const verbsList = verbs.map((verb) => (
    <Link
      href={`/verbs/${verb.id}`}
      key={verb.id}
      className="flex justify-between items-center p-4 bg-blue-100 rounded shadow-lg"
    >
      <h3 className="text-xl text-gray-700">{verb.title}</h3>
    </Link>
  ))

  return <div className="flex flex-wrap gap-4 pb-2">{verbsList}</div>
}
