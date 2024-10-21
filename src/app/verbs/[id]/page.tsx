import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { deleteVerb } from "@/actions";

function TenseView({ tense, pronouns, conjugations }) {
  const conjugation = conjugations.find((i) => i.tenseId === tense.id);

  return (
    <div className="px-4 py-2 rounded flex flex-col gap-2 bg-pink-100 shadow-lg">
      <h2 className="text-xl">{tense.name}</h2>
      <div>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr] gap-1">
            <p>{pronouns[i]}</p>
            <p>{conjugation ? conjugation[`pronoun${i}`] : "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    include: {
      Conjugation: {
        include: { tense: true },
      },
    },
  });

  const tenses = await db.tense.findMany({ orderBy: { order: "asc" } });

  const groupedTenses = tenses.reduce(
    (acc, tense) => {
      const key = tense.isActive ? "active" : "passive";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(tense);
      return acc;
    },
    { active: [], passive: [] }
  );
  console.log(groupedTenses);

  const pronounsArr = await db.pronoun.findMany();
  const pronouns = pronounsArr.reduce((acc, pronoun) => {
    acc[pronoun.id] = pronoun.name;
    return acc;
  }, {});

  if (!verb) {
    return notFound();
  }

  const deleteVerbAction = deleteVerb.bind(null, id);

  return (
    <div className="px-40 py-20 h-screen flex flex-col gap-8">
      <div className="flex flex-col">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold capitalize">{verb.title}</h1>
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
      </div>

      <div className="flex gap-4">
        <h2 className="italic">Translation:</h2>
        <p>{verb.description}</p>
      </div>

      <div className="flex flex-col gap-16">
        {Object.keys(groupedTenses).map((category) => (
          <div key={category} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold capitalize">{category}</h2>
            <div className="grid grid-cols-4 gap-4">
              {groupedTenses[category].map((tense) => (
                <TenseView
                  key={tense.id}
                  tense={tense}
                  pronouns={pronouns}
                  conjugations={verb.Conjugation}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// this caching thing is solely production thing
// prepare array of ids of existing verbs to cache their data for their view pages.
export async function generateStaticParams() {
  const verbs = await db.verb.findMany();

  return verbs.map((verb) => ({
    id: verb.id.toString(),
  }));
}
