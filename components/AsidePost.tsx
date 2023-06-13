import styles from '../app/page.module.scss'
import Categories from './Categories'
import { getPostDetails } from '@/services'
import SimilarWidget from './SimilarWidget'

async function Aside({ slug }: { slug: string }) {
  const { aside } = styles
  const post = await getPostDetails(slug)

  return (
    <aside className={aside}>
      <SimilarWidget
        slug={post!.slug}
        categories={post!.categories.map((category) => category.slug)}
      />
      <Categories />
    </aside>
  )
}

export default Aside
