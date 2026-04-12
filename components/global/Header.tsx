'use client'

import Link from 'next/link'
import styles from '@/app/page.module.scss'
import Image from 'next/image'
import SignInButton from '../buttons/SignInButton'
import ThemeToggleButton from '../buttons/ThemeToggleButton'
import { useEffect, useRef } from 'react'
import { categoriesType } from '@/utils/types/types'
import { handleMouseFeedback } from '@/utils/functions'
import useNetwork from '@/utils/constants/useNetwork'
import { Id, toast } from 'react-toastify'

type Props = { categories: categoriesType['categories'] | [] }

function Header({ categories }: Props) {
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
    handleMouseFeedback()
  }, [])

  const { header, nav, logo, navLink, firstHeaderRow, desktopActions, mobileActions } = styles

  return (
    <header className={header}>
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

      <nav className={`${nav} ${desktopActions}`}>
        <ThemeToggleButton />
        <SignInButton />
      </nav>
    </header>
  )
}

export default Header
