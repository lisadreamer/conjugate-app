'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { db } from '@/db'
import { Verb } from '@prisma/client'

interface CreateVerbFormState {
  errors: {
    title?: string[]
    description?: string[]
    _form?: string[]
  }
}

const createVerbSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
})

export async function createVerb(
  formState: CreateVerbFormState,
  formData: FormData
): Promise<CreateVerbFormState> {
  const result = createVerbSchema.safeParse({
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

export async function updateVerb(id: number, description: string) {
  await db.verb.update({
    where: { id },
    data: { description },
  })
  revalidatePath(`/verbs/${id}`)
  redirect(`/verbs/${id}`)
}

export async function deleteVerb(id: number) {
  await db.verb.delete({
    where: { id },
  })
  revalidatePath('/verbs')
  redirect('/verbs')
}
