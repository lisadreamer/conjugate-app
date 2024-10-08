import adjImg from "public/images/scale.jpg";
import Hero from "@/components/hero";

export default function AdjsPage() {
  return (
    <Hero
      title="Conjugate an adjective"
      imgAlt="steel factory"
      imgData={adjImg}
    />
  );
}
