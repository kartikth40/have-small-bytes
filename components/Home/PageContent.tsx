import styles from '../../app/page.module.scss'
import HomePagePosts from './HomePagePosts'
import Aside from '../AsideMain'
import BackToTopButton from '../backToTopButton/backToTopButton'
import { Suspense } from 'react'

type Props = { categorySlug?: string }

function PageContent({ categorySlug = '' }: Props) {
  const { contentContainer } = styles

  return (
    <section className={contentContainer}>
      <Suspense fallback={null}>
        <HomePagePosts categorySlug={categorySlug ?? ''} />
      </Suspense>
      <Aside />
      <BackToTopButton/>
    </section>
  )
}

export default PageContent
