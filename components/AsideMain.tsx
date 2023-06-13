import styles from '../app/page.module.scss'
import Categories from './Categories'
import RecentWidget from './RecentWidget'

type Props = {}

function Aside({}: Props) {
  const { aside } = styles

  return (
    <aside className={aside}>
      <RecentWidget />
      <Categories />
    </aside>
  )
}

export default Aside
