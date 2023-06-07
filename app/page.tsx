import styles from './page.module.scss'
import Header from '@/components/Header'
import FeaturedPosts from '@/components/FeaturedPosts'
import PageContent from '@/components/PageContent'

export default function Home() {
  const { main } = styles
  return (
    <main className={main}>
      <Header />
      <FeaturedPosts />
      <PageContent />
    </main>
  )
}
