'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula_light, dracula_dark } from './react-syntax-highlighter-themes'
import styles from '../../app/post/[slug]/page.module.scss'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../global/ThemeContext'

type Props = { children: string; language: string }

export default function ReactSyntaxHighlighter({ children, language }: Props) {
  const { theme } = useContext(ThemeContext)
  const dark = theme === 'dark' || theme === 'system-dark'

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const { codeBlockLoader } = styles

  return loading ? (
    <div className={codeBlockLoader}>loading...</div>
  ) : (
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
