import nounImg from 'public/images/verbs_bg.jpg'
import Hero from '@/components/hero'

export default function NounsPage() {
  return (
    <Hero
      title="Conjugate a noun"
      subTitle="[Under development]"
      imgAlt="welding"
      imgData={nounImg}
    />
  )
}
