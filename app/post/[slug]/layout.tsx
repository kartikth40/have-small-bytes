import styles from './page.module.scss'
import Aside from '@/components/Aside'
import HomePagePosts from '@/components/Home/HomePagePosts'

type Props = {}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { contentContainer, postContainer } = styles
  return (
    <section className={contentContainer}>
      <div className={postContainer}>{children}</div>
      <Aside />
    </section>
  )
}
