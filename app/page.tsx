import styles from './page.module.scss'
import Header from '@/components/Header'
import FeaturedPosts from '@/components/Home/FeaturedPosts'
import PageContent from '@/components/Home/PageContent'

export default function Home() {
  const { main } = styles
  return (
    <main className={main}>
      <Header />
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
      <PageContent />
    </main>
  )
}
