"use client";

import { useFormState } from "react-dom";
import { createVerb } from "@/actions";

export default function VerbCreatePage() {
  const [formState, action] = useFormState(createVerb, { message: "" });

  return (
    <div className="px-40 py-40 flex flex-col gap-8">
      <form action={action}>
        <h1 className="text-2xl my-5">Create a verb</h1>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label className="w-28" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="flex gap-4">
            <label className="w-28" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border rounded p-2 w-full"
            />
          </div>

          {formState.message ? (
            <div className="bg-red-200 border rounded border-red-400 p-2 ">
              {formState.message}
            </div>
          ) : null}

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded bg-green-500 py-2 px-4 text-white"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
