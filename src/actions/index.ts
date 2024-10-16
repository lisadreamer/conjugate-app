"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";

export async function createVerb(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");

    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title must be longer" };
    } else if (typeof description !== "string" || description.length < 3) {
      return { message: "Description must be longer" };
    }

    await db.verb.create({
      data: {
        title,
        description,
      },
    });
    /*throw new Error("Not implemented"); // to test error handling manually */
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "An unknown error occurred" };
    }
  }

  revalidatePath("/verbs");
  redirect("/verbs");
}

export async function updateVerb(id: number, description: string) {
  await db.verb.update({
    where: { id },
    data: { description },
  });
  revalidatePath(`/verbs/${id}`);
  redirect(`/verbs/${id}`);
}

export async function deleteVerb(id: number) {
  await db.verb.delete({
    where: { id },
  });
  revalidatePath("/verbs");
  redirect("/verbs");
}
