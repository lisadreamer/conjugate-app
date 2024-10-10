import { db } from "@/db";
import { notFound } from "next/navigation";

import VerbEditForm from "@/components/verb-edit-form";

interface VerbEditPageProps {
  params: {
    id: string;
  };
}

export default async function VerbEditPage(props: VerbEditPageProps) {
  const { params } = props;
  const id = parseInt(params.id);

  const verb = await db.verb.findFirst({
    where: { id },
  });

  if (!verb) {
    return notFound();
  }

  return (
    <div className="flex items-center mx-40 p-20">
      <VerbEditForm verb={verb} />
    </div>
  );
}
