'use client'
import React, { useContext } from 'react'
import { ThemeContext } from '../global/ThemeContext'

type Props = {}

export default function ThemeToggleButton({}: Props) {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      onClick={toggleTheme}
      style={{
        marginLeft: '1rem',
        background: 'var(--color-background)',
        color: 'var(--color-foreground)',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontFamily: 'var(--font-inter)',
      }}
    >
      {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  )
}
