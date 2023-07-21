'use client'
import React, { useEffect, useState } from 'react'
type Theme = 'light' | 'dark'
type ThemeContext = { theme: Theme; toggleTheme: () => void }

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const currentTheme = window.localStorage.getItem('theme') as Theme
  const [theme, setTheme] = useState<Theme>(currentTheme || 'light')
  useEffect(() => {
    if (document) {
      if (currentTheme === 'dark') document.body.classList.add('darkTheme')
      else document.body.classList.remove('darkTheme')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    if (document) {
      if (newTheme === 'dark') document.body.classList.add('darkTheme')
      else document.body.classList.remove('darkTheme')
    }

    window.localStorage.setItem('theme', newTheme)

    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
