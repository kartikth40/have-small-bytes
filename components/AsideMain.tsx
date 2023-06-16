import styles from '../app/page.module.scss'
import RecentWidget from './RecentWidget'

type Props = {}

function Aside({}: Props) {
  const { aside } = styles

  return (
    <aside className={aside}>
      <RecentWidget />
    </aside>
  )
}

export default Aside
