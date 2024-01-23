import Hero from '../components/Hero'
import HomeMenu from '../components/HomeMenu'
import HomeAbout from '@/components/HomeAbout'
import HomeContact from '@/components/HomeContact'

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <HomeAbout />
      <HomeContact />
    </>
  )
}