import Link from 'next/link'
import styles from '../app/page.module.scss'
import { getCategories } from '@/services'

type Props = {}

async function Categories({}: Props) {
  const { categoriesContainer } = styles
  const categories = await getCategories()

  return (
    <div className={categoriesContainer}>
      {categories.map((cat) => (
        <Link href={`category/${cat.slug}`}>{cat.name}</Link>
      ))}
    </div>
  )
}

export default Categories
