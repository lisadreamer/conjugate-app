import type { Conjugation, Pronoun, Tense } from "@prisma/client";

interface TenseViewProps {
  tense: Tense;
  pronouns: Pronoun[];
  conjugations: Conjugation[];
}

export default function TenseView({ tense, pronouns, conjugations }: TenseViewProps) {
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
