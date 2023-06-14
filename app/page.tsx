export const revalidate = 60

import styles from './page.module.scss'

import FeaturedPosts from '@/components/Home/FeaturedPosts'
import PageContent from '@/components/Home/PageContent'

export default function Home() {
  return (
    <main className={styles.main}>
      <FeaturedPosts />
      <PageContent />
    </main>
  )
}
