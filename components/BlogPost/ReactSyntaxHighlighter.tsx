'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula_light, dracula_dark } from './react-syntax-highlighter-themes'
import styles from '../../app/post/[slug]/page.module.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from '../global/ThemeContext'

type Props = { children: string; language: string }

export default function ReactSyntaxHighlighter({ children, language }: Props) {
  const { theme } = useContext(ThemeContext)
  const dark = theme === 'dark' || theme === 'system-dark'
  const [loading, setLoading] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const preRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    const el = preRef.current?.querySelector('pre')
    if (!el) return

    function check() {
      if (!el) return
      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
      const noOverflow = el.scrollWidth <= el.clientWidth
      setAtEnd(isAtEnd || noOverflow)
    }

    check()
    el.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    return () => {
      el.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [loading])

  const { codeBlockLoader, codeScrollWrapper } = styles

  return loading ? (
    <div className={codeBlockLoader}>loading...</div>
  ) : (
    <div
      className={codeScrollWrapper}
      ref={preRef}
      data-at-end={atEnd}
    >
      <SyntaxHighlighter
        language={language}
        style={dark ? dracula_dark : dracula_light}
        showLineNumbers
        showInlineLineNumbers
      >
        {children.trimEnd()}
      </SyntaxHighlighter>
    </div>
  )
}
