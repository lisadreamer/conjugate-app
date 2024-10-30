import { redirect } from 'next/navigation'
import VerbsList from '@/components/verbs/verbs-list'
import { searchVerbs } from '@/db/verbs'

interface SearchPageProps {
  searchParams: {
    term: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = searchParams

  if (!term) {
    redirect('/')
  }

  return (
    <div className="px-40 py-40 flex flex-col gap-8">
      <h1 className="text-2xl font-bold my-4">Search: {term}</h1>
      <VerbsList fetchData={() => searchVerbs(term)} />
    </div>
  )
}
