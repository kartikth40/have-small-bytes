'use client'
import React, { useContext } from 'react'
import { ThemeContext } from '../global/ThemeContext'
import styles from '@/app/page.module.scss'
import Image from 'next/image'

type Props = {}

export default function ThemeToggleButton({}: Props) {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      onClick={toggleTheme}
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
          filter: `${theme === 'system-dark' ? 'invert(1)' : 'invert(0)'}`,
        }}
        // sizes="(max-width: 768px) 40px, (max-width: 1200px) 50px, 40px"
        fill
        alt={'theme logo'}
      />
    </button>
  )
}
