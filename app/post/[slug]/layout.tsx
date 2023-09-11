import styles from './page.module.scss'
import Aside from '@/components/AsidePost'

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const { contentContainer, postContainer } = styles
  return (
    <main className={contentContainer}>
      <div className={postContainer}>{children}</div>
      <Aside slug={params.slug} />
    </main>
  )
}
