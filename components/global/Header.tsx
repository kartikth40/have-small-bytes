'use client'

import Link from 'next/link'
import styles from '@/app/page.module.scss'
import { getCategories } from '@/services'
import Image from 'next/image'
import SignInButton from '../buttons/SignInButton'
import ThemeToggleButton from '../buttons/ThemeToggleButton'
import useWindowSize from '@/utils/constants/useWindowSize'
import screenSize from '@/utils/constants/mediaQueries'
import { useEffect, useRef, useState } from 'react'
import { categoriesType } from '@/utils/types/types'
import { handleMouseFeedback } from '@/utils/functions'
import useNetwork from '@/utils/constants/useNetwork'
import { Id, toast } from 'react-toastify'

type Props = {}

function Header({}: Props) {
  const [categories, setCategories] = useState<
    categoriesType['categories'] | []
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const [mobile, setMobile] = useState<boolean>(false)

  const windowSize = useWindowSize()
  const isOnline = useNetwork()
  const connectionToastId = useRef('' as Id)

  useEffect(() => {
    toast.dismiss(connectionToastId.current)
    if (!isOnline) {
      connectionToastId.current = toast.warning('No Internet Connection!', {
        autoClose: false,
        closeButton: false,
      })
    } else if (connectionToastId.current !== '') {
      connectionToastId.current = toast.success('Back Online...', {
        autoClose: 3000,
      })
    }
  }, [isOnline])

  useEffect(() => {
    async function setCat() {
      setCategories(await getCategories())
    }

    handleMouseFeedback()
    setCat()
  }, [])

  useEffect(() => {
    if (categories.length === 0) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [categories])

  useEffect(() => {
    if (windowSize && windowSize <= screenSize.tablet) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }, [windowSize])

  const { header, nav, logo, navLink, loadingBtn, firstHeaderRow, hideMe } =
    styles

  return (
    <header className={header}>
      <div className={firstHeaderRow}>
        <div className={logo}>
          <Link href="/">
            <Image
              src="/icons/hsb-icon.png"
              style={{ objectFit: 'cover' }}
              width={40}
              height={40}
              alt={'Logo'}
            />
            <span>Have Small Bytes</span>
          </Link>
        </div>
        <nav className={`${nav} ${!mobile && hideMe}`}>
          <ThemeToggleButton />
          <SignInButton />
        </nav>
      </div>

      <nav className={nav}>
        {loading
          ? ['Web Development', 'DSA', 'Personal Development'].map(
              (cat, idx) => (
                <span key={idx} className={`${loadingBtn} ${navLink}`}>
                  {cat}
                </span>
              )
            )
          : categories.map((category) => (
              <Link
                key={category.slug}
                href={`category/${category.slug}`}
                className={navLink}
              >
                {category.name}
              </Link>
            ))}
        <span className={`${nav} ${mobile && hideMe}`}>
          <ThemeToggleButton />
          <SignInButton />
        </span>
      </nav>
    </header>
  )
}

export default Header
