'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula_light, dracula_dark } from './react-syntax-highlighter-themes'
import { useContext } from 'react'
import { ThemeContext } from '../global/ThemeContext'

type Props = { children: string; language: string }

export default function ReactSyntaxHighlighter({ children, language }: Props) {
  const { theme } = useContext(ThemeContext)
  const dark = theme === 'dark' || theme === 'system-dark'
  return (
    <SyntaxHighlighter
      language={language}
      style={dark ? dracula_dark : dracula_light}
      showLineNumbers
      showInlineLineNumbers
    >
      {children}
    </SyntaxHighlighter>
  )
}
