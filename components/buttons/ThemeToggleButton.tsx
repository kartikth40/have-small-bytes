'use client'
import React, { useContext } from 'react'
import { ThemeContext } from '../global/ThemeContext'
import styles from '@/app/page.module.scss'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function HalfMoonSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
    >
      {/* circle outline */}
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* left half — filled white */}
      <path d="M12 2 A10 10 0 0 0 12 22 Z" fill="currentColor" />
      {/* vertical divider */}
      <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

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
      {theme.startsWith('system') ? (
        <HalfMoonSvg />
      ) : (
        <Image
          src={`/icons/${theme === 'light' ? 'sun' : 'moon'}.png`}
          style={{
            objectFit: 'cover',
          }}
          fill
          sizes="24px"
          alt={'theme logo'}
        />
      )}
    </button>
  )
}
