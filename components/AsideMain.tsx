import styles from '../app/page.module.scss'
import Categories from './Categories'
import RecentWidget from './RecentWidget'

type Props = {}

function Aside({}: Props) {
  const { aside, fixedAside } = styles

  return (
    <aside className={aside}>
      {/* <div className={fixedAside}> */}
      <RecentWidget />
      <Categories />
      {/* </div> */}
    </aside>
  )
}

export default Aside
