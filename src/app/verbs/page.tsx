import Link from 'next/link'
import { getServerSession } from 'next-auth'
import Hero from '@/components/hero'
import { authOptions } from '@/auth'
import verbImg from 'public/images/animalswithbook.jpg'
import VerbsList from '@/components/verbs/verbs-list'
import { getTopVerbs } from '@/db/verbs'

export default async function VerbsPage() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <Hero
        title="Conjugate a verb"
        imgAlt="welding"
        imgData={verbImg}
        hasSearch
      />

      <div className="flex flex-col gap-4 p-8 mx-20 mb-52">
        <div className="flex justify-between items-center m-2">
          <h1 className="text-2xl font-bold">Verbs:</h1>
          {session?.user && (
            <Link
              href="/verbs/new"
              className="bg-green-500 rounded px-4 py-2 text-white"
            >
              Create
            </Link>
          )}
        </div>

        <VerbsList fetchData={getTopVerbs} />
      </div>
    </div>
  )
}
