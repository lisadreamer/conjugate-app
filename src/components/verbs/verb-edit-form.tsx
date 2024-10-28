'use client'

import type { Verb } from '@prisma/client'
import { useFormState } from 'react-dom'
import React from 'react'
import { Input, Textarea, Button } from '@nextui-org/react'
import { updateVerb } from '@/actions'
import ProtectedPage from '@/components/protected-page'

interface VerbEditFormProps {
  verb: Verb
}

export default function VerbEditForm({ verb }: VerbEditFormProps) {
  const [formState, action] = useFormState(updateVerb.bind(null, verb.id), {
    errors: {},
  })

  return (
    <ProtectedPage>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl my-5">
          Edit verb <b>{verb.title}</b>
        </h1>
        <form action={action} className="flex flex-col justify-center gap-4">
          <Input
            name="title"
            label="Title"
            labelPlacement="outside"
            placeholder="Title"
            defaultValue={verb.title}
            isInvalid={!!formState.errors.title}
            errorMessage={formState.errors.title?.join(', ')}
          />

          <Textarea
            name="description"
            label="Translation"
            labelPlacement="outside"
            placeholder="Describe verb..."
            defaultValue={verb.description}
            isInvalid={!!formState.errors.description}
            errorMessage={formState.errors.description?.join(', ')}
          />

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
