"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const currentPath = usePathname();
  const rootPaths = ["/", "/verbs", "/nouns", "/adjs"].includes(currentPath);

  return (
    <div className={`w-full z-10 ${rootPaths ? "absolute text-white" : "bg-blue-100 text-gray-600"}`}>
      <nav className="container relative flex flex-wrap items-center justify-between mx-auto p-8">
        <Link href="/" className="font-bold text-3xl">
          Sahil
        </Link>
        <div className="space-x-4 text-xl font-bold">
          <Link href="/verbs">Verbs</Link>
          <Link href="/nouns">Nouns</Link>
          <Link href="/adjs">Adjectives</Link>
        </div>
      </nav>
    </div>
  );
}
