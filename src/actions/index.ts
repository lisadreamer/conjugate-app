"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";

export async function createVerb(formState: {message: string}, formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");

  if (typeof title !== "string" || title.length < 3) {
    return { message: "Title must be longer" };
  } else if (typeof description !== "string" || description.length < 3) {
    return { message: "Description must be longer" };
  }

  const verb = await db.verb.create({
    data: {
      title,
      description,
    },
  });
  console.log(verb);

  redirect("/verbs");
}

export async function updateVerb(id: number, description: string) {
  await db.verb.update({
    where: { id },
    data: { description },
  });
  redirect(`/verbs/${id}`);
}

export async function deleteVerb(id: number) {
  await db.verb.delete({
    where: { id },
  });
  redirect("/verbs");
}
