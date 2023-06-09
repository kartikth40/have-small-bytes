import styles from './page.module.scss'

import FeaturedPosts from '@/components/Home/FeaturedPosts'
import PageContent from '@/components/Home/PageContent'

export default function Home() {
  const { main } = styles
  return (
    <main className={main}>
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
      <PageContent />
    </main>
  )
}
