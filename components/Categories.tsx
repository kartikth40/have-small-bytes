import Link from 'next/link'
import styles from '../app/page.module.scss'
import { getCategories } from '@/services'

type Props = {}

async function Categories({}: Props) {
  const { categoriesContainer } = styles
  const categories = await getCategories()

  return (
    <div className={categoriesContainer}>
      <h2>Categories</h2>
      {categories.map((cat) => (
        <Link key={cat.name} href={`category/${cat.slug}`}>
          {cat.name}
        </Link>
      ))}
    </div>
  )
}

export default Categories
