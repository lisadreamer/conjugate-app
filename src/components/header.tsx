"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@/components/profile";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const currentPath = usePathname();
  const rootPaths = ["/", "/verbs", "/nouns", "/adjs"].includes(currentPath);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`w-full z-50 fixed transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"} ${rootPaths ? "absolute text-white" : "bg-blue-100 text-gray-600"}`}
    >
      <div className=" flex justify-between mx-8">
        <nav className="flex items-center gap-8 p-8">
          <Link href="/" className="font-bold text-3xl">
            Sahil
          </Link>
          <div className="space-x-4 text-xl font-bold">
            <Link href="/verbs">Verbs</Link>
            <Link href="/nouns">Nouns</Link>
            <Link href="/adjs">Adjectives</Link>
          </div>
        </nav>
        <Profile />
      </div>
    </div>
  );
}
