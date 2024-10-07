import Link from "next/link";
import Hero from "@/components/hero";
import {db} from "@/db";
import verbImg from "public/images/performance.jpg";

export default async function VerbsPage() {
  const verbs = await db.verb.findMany();

  return (
    <div>
      <Hero
        title="Conjugate a verb"
        imgAlt="welding"
        imgData={verbImg}
      />
      <Link href="/verbs/new">Create</Link>
    </div>
  );
}
