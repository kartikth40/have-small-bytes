'use client'
import React, { useEffect, useState } from 'react'
type Theme = 'light' | 'dark'
type ThemeContext = { theme: Theme; toggleTheme: () => void }

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const currentTheme = window.localStorage.getItem('theme') as Theme
    setTheme(currentTheme)
  }, [])

  useEffect(() => {
    if (document) {
      if (theme === 'dark') document.body.classList.add('darkTheme')
      else document.body.classList.remove('darkTheme')
    }
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
