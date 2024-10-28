'use client'

import React from 'react'
import { useFormState } from 'react-dom'
import type { Conjugation, Verb } from '@prisma/client'
import ProtectedPage from '@/components/protected-page'
import { updateConjugation } from '@/actions/update-conjugation'
import { Button, Input } from '@nextui-org/react'

interface ConjugationEditFormProps {
  conjugation: Conjugation & {
    tense: { name: string }
    verb: Verb
  }
  pronouns: Record<number, string>
}

type PronounKey =
  | 'pronoun1'
  | 'pronoun2'
  | 'pronoun3'
  | 'pronoun4'
  | 'pronoun5'
  | 'pronoun6'

export default function ConjugationEditForm({
  conjugation,
  pronouns,
}: ConjugationEditFormProps) {
  const [formState, action] = useFormState(
    updateConjugation.bind(null, conjugation.id, conjugation.verb.id),
    {
      errors: {},
    }
  )

  return (
    <ProtectedPage>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl my-5">
          Edit conjugation for verb <b>{conjugation.verb.title}</b> in{' '}
          <i>{conjugation.tense.name}</i>
        </h1>
        <form action={action} className="flex flex-col justify-center gap-4">
          <div className="grid grid-cols-[1fr_1fr] grid-rows-3 gap-2 grid-flow-col">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const key = `pronoun${i}` as PronounKey
              return (
                <div key={i}>
                  <Input
                    name={key}
                    label={pronouns[i]}
                    labelPlacement="inside"
                    defaultValue={conjugation[key]}
                    isInvalid={!!formState.errors[key]}
                    errorMessage={formState.errors[key]?.join(', ')}
                  />
                </div>
              )
            })}
          </div>

          {formState.errors._form ? (
            <div className="bg-red-200 border rounded border-red-400 p-2 ">
              {formState.errors._form?.join(', ')}
            </div>
          ) : null}

          <Button type="submit" color="success" className="text-white">
            Save
          </Button>
        </form>
      </div>
    </ProtectedPage>
  )
}
