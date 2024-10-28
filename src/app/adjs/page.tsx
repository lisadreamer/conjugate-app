import adjImg from 'public/images/adj_bg.jpg'
import Hero from '@/components/hero'

export default function AdjsPage() {
  return (
    <Hero
      title="Conjugate an adjective"
      subTitle="[Under development]"
      imgAlt="steel factory"
      imgData={adjImg}
    />
  )
}
