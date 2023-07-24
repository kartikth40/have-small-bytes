'use client'
import React, { useContext } from 'react'
import { ThemeContext } from '../global/ThemeContext'
import styles from '@/app/page.module.scss'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

type Props = {}

export default function ThemeToggleButton({}: Props) {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const path = usePathname()
  const adjust = path === '/auth/signin' || path === '/auth/signup'
  return (
    <button
      onClick={toggleTheme}
      id={`${adjust && styles.adjustIt}`}
      className={styles.themeButton}
      data-theme={
        theme.startsWith('system')
          ? 'OS Default'
          : theme === 'dark'
          ? 'Dark Mode'
          : 'Light Mode'
      }
    >
      <Image
        src={`/icons/${
          theme === 'light' ? 'sun' : theme === 'dark' ? 'moon' : 'half-moon'
        }.png`}
        style={{
          objectFit: 'cover',
          filter: `${
            theme === 'system-dark' ? 'invert(1) brightness(0.9)' : 'invert(0)'
          }`,
        }}
        // sizes="(max-width: 768px) 40px, (max-width: 1200px) 50px, 40px"
        fill
        sizes="24px"
        alt={'theme logo'}
      />
    </button>
  )
}
