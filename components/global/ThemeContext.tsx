'use client'
import React, { useState } from 'react'
type Theme = 'light' | 'dark'
type ThemeContext = { theme: Theme; toggleTheme: () => void }

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  if (theme === 'dark') document.body.classList.add('darkTheme')
  else document.body.classList.remove('darkTheme')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
