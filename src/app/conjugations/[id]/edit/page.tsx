import { notFound } from 'next/navigation'
import { db } from '@/db'
import ConjugationEditForm from '@/components/conjugations/conjugation-edit-form'
import { getPronouns } from '@/actions'

interface ConjugationEditPageProps {
  params: {
    id: string
  }
}

export default async function ConjugationEditPage(
  props: ConjugationEditPageProps
) {
  const id = parseInt(props.params.id)

  const conjugation = await db.conjugation.findFirst({
    where: { id },
    include: { tense: true, verb: true },
  })

  const pronouns = await getPronouns()

  if (!conjugation) {
    return notFound()
  }

  return (
    <div className="flex items-center justify-center px-40 py-40">
      <ConjugationEditForm conjugation={conjugation} pronouns={pronouns} />
    </div>
  )
}
