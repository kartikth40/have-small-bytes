import styles from '../../app/page.module.scss'
import HomePagePosts from './HomePagePosts'
import Aside from '../AsideMain'

type Props = {}

function PageContent({}: Props) {
  const { contentContainer } = styles

  return (
    <section className={contentContainer}>
      <HomePagePosts />
      <Aside />
    </section>
  )
}

export default PageContent
