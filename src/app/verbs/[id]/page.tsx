import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { deleteVerb } from "@/actions";

interface VerbShowPageProps {
  params: {
    id: string;
  };
}

export default async function VerbShowPage(props: VerbShowPageProps) {
  const { params } = props;
  const id = parseInt(params.id);

  const verb = await db.verb.findFirst({
    where: { id: id },
  });

  if (!verb) {
    return notFound();
  }

  const deleteVerbAction = deleteVerb.bind(null, id);

  return (
    <div className="px-40 py-20 h-screen">
      <div className="flex justify-center">
        <h1 className="text-xl font-bold capitalize">{verb.title}</h1>
      </div>
      <div className="flex justify-end items-center m-4">
        <div className="flex gap-4">
          <Link href={`/verbs/${id}/edit`} className="border rounded p-2">
            Edit
          </Link>
          <form action={deleteVerbAction}>
            <button className="bg-red-500 rounded p-2 text-white">
              Delete
            </button>
          </form>
        </div>
      </div>

      <div className="m-4 flex gap-4">
        <h2 className="italic">Description:</h2>
        <p>{verb.description}</p>
      </div>
    </div>
  );
}

// this caching thing is solely production thing
export async function generateStaticParams() {
  const verbs = await db.verb.findMany();

  return verbs.map((verb) => ({
    id: verb.id.toString(),
  }));
}
