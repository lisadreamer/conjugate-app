import Link from "next/link";

export default function Header() {
  //todo: determine which page is it and set whiteBg accordingly
  const whiteBg = true;

  return (
    <div className={`w-full z-10 ${whiteBg ? "" : "absolute text-white"}`}>
      <nav className="container relative flex flex-wrap items-center justify-between mx-auto p-8">
        <Link href="/" className="font-bold text-3xl">
          Sahyl
        </Link>
        <div className="space-x-4 text-xl">
          <Link href="/verbs">Verbs</Link>
          <Link href="/nouns">Nouns</Link>
          <Link href="/adjs">Adjectives</Link>
        </div>
      </nav>
    </div>
  );
}
