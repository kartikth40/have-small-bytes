'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from './react-syntax-highlighter-themes'

type Props = { children: string; language: string }

export default function ReactSyntaxHighlighter({ children, language }: Props) {
  return (
    <SyntaxHighlighter
      language={language}
      style={dracula}
      wrapLongLines
      wrapLines
    >
      {children}
    </SyntaxHighlighter>
  )
}
