import { redirect } from "next/navigation";
import { db } from "@/db";

export default function VerbCreatePage() {
  async function createVerb(formData: FormData) {
    "use server"; // treat this as server action

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const verb = await db.verb.create({
      data: {
        title,
        description,
      },
    });
    console.log(verb);

    redirect("/verbs");
  }

  return (
    <div className="container mx-auto px-12">
      <form action={createVerb}>
        <h3 className="font-bold m-3">Create a verb</h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label className="w-20" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="flex gap-4">
            <label className="w-20" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border rounded p-2 w-full"
            />
          </div>

          <button type="submit" className="rounded bg-blue-200 p-2">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
