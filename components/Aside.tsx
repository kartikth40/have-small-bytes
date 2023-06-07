import styles from '../app/page.module.scss'
import RecentPosts from './RecentPosts'
import Categories from './Categories'

type Props = {}

function Aside({}: Props) {
  const { aside } = styles

  return (
    <aside className={aside}>
      <RecentPosts />
      <Categories />
    </aside>
  )
}

export default Aside
