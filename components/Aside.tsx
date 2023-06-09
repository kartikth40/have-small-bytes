import styles from '../app/page.module.scss'
import PostWidget from './PostWidget'
import Categories from './Categories'

type Props = {}

function Aside({}: Props) {
  const { aside, fixedAside } = styles

  return (
    <aside className={aside}>
      {/* <div className={fixedAside}> */}
      <PostWidget />
      {/* @ts-expect-error Server Component */}
      <Categories />
      {/* </div> */}
    </aside>
  )
}

export default Aside
