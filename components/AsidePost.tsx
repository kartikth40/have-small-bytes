import styles from '../app/page.module.scss'
import { getPostDetails } from '@/services'
import SimilarWidget from './SimilarWidget'
import { notFound } from 'next/navigation'

async function Aside({ slug }: { slug: string }) {
  const { aside } = styles
  const post = await getPostDetails(slug)
  if (!post) return notFound()

  return (
    <aside className={aside}>
      <SimilarWidget
        slug={post!.slug}
        categories={post!.categories.map((category) => category.slug)}
      />
    </aside>
  )
}

export default Aside
