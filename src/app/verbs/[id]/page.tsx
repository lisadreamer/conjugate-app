import { notFound } from "next/navigation";
import { db } from "@/db";

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

  return (
    <div>
      <h2>Verb:</h2>
      <p>{verb.title}</p>
    </div>
  );
}
