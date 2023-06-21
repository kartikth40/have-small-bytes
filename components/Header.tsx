import Link from 'next/link'
import styles from '../app/page.module.scss'
import { getCategories } from '@/services'
import Image from 'next/image'
import SignInButton from './buttons/SignInButton'

type Props = {}

async function Header({}: Props) {
  const { header, nav, logo, navLink } = styles

  const categories = await getCategories()

  return (
    <header className={header}>
      <div className={logo}>
        <Link href="/">
          <Image
            src="/icons/hsb-icon.png"
            style={{ objectFit: 'cover' }}
            // sizes="(max-width: 768px) 40px, (max-width: 1200px) 50px, 40px"
            width={40}
            height={40}
            alt={'Logo'}
          />
          <span>Have Small Byte</span>
        </Link>
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
        <SignInButton />
      </nav>
    </header>
  )
}

export default Header
