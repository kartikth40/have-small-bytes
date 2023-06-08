import styles from '../app/page.module.scss'
import PostWidget from './PostWidget'
import Categories from './Categories'

type Props = {}

function Aside({}: Props) {
  const { aside, fixedAside } = styles

  return (
    <aside className={aside}>
      {/* <div className={fixedAside}> */}
      {/* @ts-expect-error Server Component */}
      <PostWidget />
      <Categories />
      {/* </div> */}
    </aside>
  )
}

export default Aside
