import styles from '../../app/page.module.scss'
import HomePagePosts from './HomePagePosts'
import Aside from '../Aside'

type Props = {}

function PageContent({}: Props) {
  const { contentContainer } = styles

  return (
    <section className={contentContainer}>
      {/* @ts-expect-error Server Component */}
      <HomePagePosts />
      <Aside />
    </section>
  )
}

export default PageContent
