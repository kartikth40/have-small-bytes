'use client'
import React, { useContext } from 'react'
import { ThemeContext } from '../global/ThemeContext'

type Props = {}

export default function ThemeToggleButton({}: Props) {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  )
}
