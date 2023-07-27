'use client'
import React, { useEffect, useState } from 'react'
type Theme = 'light' | 'dark' | 'system-dark' | 'system-light'
type ThemeContext = { theme: Theme; toggleTheme: () => void }

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [firstRender, setFirstRender] = useState<boolean>(true)
  const [theme, setTheme] = useState<Theme>('system-dark')

  // on first load
  useEffect(() => {
    const currentSavedTheme = window.localStorage.getItem('theme') as Theme

    if (!currentSavedTheme) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme('system-dark')
      } else {
        setTheme('system-light')
      }
    } else setTheme(currentSavedTheme)
  }, [])

  // on theme change
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
      return
    }
    window.localStorage.setItem('theme', theme)
    if (document) {
      if (theme === 'dark' || theme === 'system-dark')
        document.body.classList.add('darkTheme')
      else document.body.classList.remove('darkTheme')
    }
  }, [theme])

  // toggle theme func
  const toggleTheme = () => {
    if (theme === 'system-dark' || theme === 'system-light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('light')
    } else {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme('system-dark')
      } else {
        setTheme('system-light')
      }
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
