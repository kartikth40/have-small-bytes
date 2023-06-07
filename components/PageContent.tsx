import Categories from './Categories'
import RecentPosts from './RecentPosts'
import styles from '../app/page.module.scss'

type Props = {}

function PageContent({}: Props) {
  const { contentContainer, postsContainer, aside } = styles

  return (
    <section className={contentContainer}>
      <section className={postsContainer}>Posts</section>
      <aside className={aside}>
        <RecentPosts />
        <Categories />
      </aside>
    </section>
  )
}

export default PageContent
