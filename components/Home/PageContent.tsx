import styles from '../../app/page.module.scss'
import HomePagePosts from './HomePagePosts'
import Aside from '../AsideMain'
import BackToTopButton from '../backToTopButton/backToTopButton'

type Props = { categorySlug?: string }

function PageContent({ categorySlug = '' }: Props) {
  const { contentContainer } = styles

  return (
    <section className={contentContainer}>
      <HomePagePosts categorySlug={categorySlug ?? ''} />
      <Aside />
      <BackToTopButton/>
    </section>
  )
}

export default PageContent
