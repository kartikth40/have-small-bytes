'use client'

import Link from 'next/link'
import styles from '@/app/page.module.scss'
import { getCategories } from '@/services'
import Image from 'next/image'
import SignInButton from '../buttons/SignInButton'
import ThemeToggleButton from '../buttons/ThemeToggleButton'
import useWindowSize from '@/utils/constants/useWindowSize'
import screenSize from '@/utils/constants/mediaQueries'
import { useEffect, useState } from 'react'
import { categoriesType } from '@/utils/types/types'

type Props = {}

function Header({}: Props) {
  const [categories, setCategories] = useState<
    categoriesType['categories'] | []
  >([])
  const windowSize = useWindowSize()
  useEffect(() => {
    async function setCat() {
      setCategories(await getCategories())
    }
    setCat()
  }, [])

  const { header, nav, logo, navLink } = styles
  console.log(windowSize, screenSize.mobile)

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
          <span>Have Small Bytes</span>
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
        <ThemeToggleButton />
        <SignInButton />
      </nav>
    </header>
  )
}

export default Header
