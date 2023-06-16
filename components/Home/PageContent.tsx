import styles from '../../app/page.module.scss'
import HomePagePosts from './HomePagePosts'
import Aside from '../AsideMain'

type Props = { categorySlug?: string }

function PageContent({ categorySlug = '' }: Props) {
  const { contentContainer } = styles

  return (
    <section className={contentContainer}>
      <HomePagePosts categorySlug={categorySlug ?? ''} />
      <Aside />
    </section>
  )
}

export default PageContent
