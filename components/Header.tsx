import Link from 'next/link'
import styles from '../app/page.module.scss'
import { getCategories } from '@/services'

type Props = {}

async function Header({}: Props) {
  const { header, nav, logo, navLink } = styles

  const categories = await getCategories()

  return (
    <header className={header}>
      <div className={logo}>
        <Link href="/">HSB</Link>
      </div>
      <nav className={nav}>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`category/${category.slug}`}
            className={navLink}
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header
