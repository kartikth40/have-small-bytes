export const revalidate = 60

import FeaturedPosts from '@/components/Home/FeaturedPosts'
import HeroSection from '@/components/Home/HeroSection'
import PageContent from '@/components/Home/PageContent'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedPosts />
      <PageContent />
    </main>
  )
}
