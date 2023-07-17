'use client'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

type Props = { children: string; language: string }

export default function ReactSyntaxHighlighter({ children, language }: Props) {
  return (
    <SyntaxHighlighter
      children={children}
      language={language}
      style={docco}
    ></SyntaxHighlighter>
  )
}
