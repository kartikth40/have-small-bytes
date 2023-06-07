import Link from 'next/link'
import styles from '../app/page.module.scss'

const categories = [
  { name: 'Web Dev', slug: 'web-dev' },
  { name: 'DSA', slug: 'dsa' },
  { name: 'Pers Dev', slug: 'per-dev' },
]

type Props = {}

function Header({}: Props) {
  const { header, nav, logo, navLink } = styles

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
