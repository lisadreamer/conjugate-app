'use client'

import type { Verb } from '@prisma/client'
import React from 'react'
import { updateVerb } from '@/actions'
import ProtectedPage from '@/components/protected-page'

interface VerbEditFormProps {
  verb: Verb
}

export default function VerbEditForm({ verb }: VerbEditFormProps) {
  const [description, setDescription] = React.useState<string>(verb.description)
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value)
  }

  const editVerbAction = updateVerb.bind(null, verb.id, description)

  return (
    <ProtectedPage>
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-2xl">
          Edit verb <b>{verb.title}</b>
        </h1>
        <div className="flex gap-4">
          <label className="w-20" htmlFor="description">
            Translation:
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded p-2 w-full"
            value={description}
            onChange={handleChange}
          />
        </div>
        <form action={editVerbAction}>
          <button type="submit" className="rounded bg-green-500 p-2">
            Save
          </button>
        </form>
      </div>
    </ProtectedPage>
  )
}
