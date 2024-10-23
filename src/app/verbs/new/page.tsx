'use client'

import { useFormState } from 'react-dom'
import { Input, Textarea, Button } from '@nextui-org/react'
import { createVerb } from '@/actions'

export default function VerbCreatePage() {
  const [formState, action] = useFormState(createVerb, { errors: {} })

  return (
    <div className="mx-80 py-40 flex flex-col gap-8">
      <form action={action}>
        <h1 className="text-2xl my-5">Create a verb</h1>
        <div className="flex flex-col gap-4">
          <Input
            name="title"
            label="Title"
            labelPlacement="outside"
            placeholder="Title"
            isInvalid={!!formState.errors.title}
            errorMessage={formState.errors.title?.join(', ')}
          />

          <Textarea
            name="description"
            label="Description"
            labelPlacement="outside"
            placeholder="Describe verb..."
            isInvalid={!!formState.errors.description}
            errorMessage={formState.errors.description?.join(', ')}
          />

          {formState.errors._form ? (
            <div className="bg-red-200 border rounded border-red-400 p-2 ">
              {formState.errors._form?.join(', ')}
            </div>
          ) : null}

          <div className="flex justify-end">
            <Button type="submit" color="success" className="text-white">
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
