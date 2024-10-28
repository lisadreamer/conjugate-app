'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { db } from '@/db'
import { Conjugation } from '@prisma/client'

interface EditConjugationFormState {
  errors: {
    pronoun1?: string[]
    pronoun2?: string[]
    pronoun3?: string[]
    pronoun4?: string[]
    pronoun5?: string[]
    pronoun6?: string[]
    _form?: string[]
  }
}

const conjugationSchema = z.object({
  pronoun1: z.string().min(2),
  pronoun2: z.string().min(2),
  pronoun3: z.string().min(2),
  pronoun4: z.string().min(2),
  pronoun5: z.string().min(2),
  pronoun6: z.string().min(2),
})

export async function updateConjugation(
  id: number,
  verbId: number,
  formState: EditConjugationFormState,
  formData: FormData
): Promise<EditConjugationFormState> {
  const result = conjugationSchema.safeParse({
    pronoun1: formData.get('pronoun1'),
    pronoun2: formData.get('pronoun2'),
    pronoun3: formData.get('pronoun3'),
    pronoun4: formData.get('pronoun4'),
    pronoun5: formData.get('pronoun5'),
    pronoun6: formData.get('pronoun6'),
  })

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  let conjugation: Conjugation
  try {
    conjugation = await db.conjugation.update({
      where: { id },
      data: {
        pronoun1: result.data.pronoun1,
        pronoun2: result.data.pronoun2,
        pronoun3: result.data.pronoun3,
        pronoun4: result.data.pronoun4,
        pronoun5: result.data.pronoun5,
        pronoun6: result.data.pronoun6,
      },
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } }
    } else {
      return { errors: { _form: ['An unknown error occurred'] } }
    }
  }

  revalidatePath(`/conjugations/${conjugation.id}`)
  redirect(`/verbs/${verbId}`)
}
