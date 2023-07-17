'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props = { children: string; language: string }

export default function ReactSyntaxHighlighter({ children, language }: Props) {
  return (
    <SyntaxHighlighter
      children={children}
      language={language}
      style={atomDark}
      wrapLongLines
      wrapLines
      customStyle={{ background: '#171717' }}
    ></SyntaxHighlighter>
  )
}
