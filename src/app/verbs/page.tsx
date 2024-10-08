import Link from "next/link";
import Hero from "@/components/hero";
import { db } from "@/db";
import verbImg from "public/images/performance.jpg";

export default async function VerbsPage() {
  const verbs = await db.verb.findMany();

  const verbsList = verbs.map((verb) => (
    <Link
      href={`/verbs/${verb.id}`}
      key={verb.id}
      className="flex justify-between items-center p-4 bg-blue-100 rounded shadow-lg"
    >
      <h3 className="text-xl text-gray-700">{verb.title}</h3>
    </Link>
  ));

  return (
    <div>
      <Hero title="Conjugate a verb" imgAlt="welding" imgData={verbImg} />
      <div className="flex flex-col gap-4 justify-center items-center p-8">
        <h2 className="text-2xl font-bold">Verbs:</h2>
        <div className="flex flex-wrap gap-4 pb-2">{verbsList}</div>
        <Link
          href="/verbs/new"
          className="bg-green-500 rounded px-4 py-2 text-white"
        >
          Create
        </Link>
      </div>
    </div>
  );
}
