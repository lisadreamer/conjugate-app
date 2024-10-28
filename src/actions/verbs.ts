'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { db } from '@/db'
import { Verb } from '@prisma/client'

interface VerbFormState {
  errors: {
    title?: string[]
    description?: string[]
    _form?: string[]
  }
}

const verbSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
})

export async function createVerb(
  formState: VerbFormState,
  formData: FormData
): Promise<VerbFormState> {
  const result = verbSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  })

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  let verb: Verb
  try {
    verb = await db.verb.create({
      data: {
        title: result.data.title,
        description: result.data.description,
      },
    })
    /*throw new Error("Not implemented"); // to test error handling manually */
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } }
    } else {
      return { errors: { _form: ['An unknown error occurred'] } }
    }
  }

  revalidatePath('/verbs')
  redirect(`/verbs/${verb.id}`)
}

export async function updateVerb(
  id: number,
  formState: VerbFormState,
  formData: FormData
): Promise<VerbFormState> {
  const result = verbSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  })

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  let verb: Verb
  try {
    verb = await db.verb.update({
      where: { id },
      data: { title: result.data.title, description: result.data.description },
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } }
    } else {
      return { errors: { _form: ['An unknown error occurred'] } }
    }
  }

  revalidatePath(`/verbs/${verb.id}`)
  redirect(`/verbs/${verb.id}`)
}

export async function deleteVerb(id: number) {
  await db.verb.delete({
    where: { id },
  })
  revalidatePath('/verbs')
  redirect('/verbs')
}
