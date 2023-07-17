'use client'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { CodeRenderer, ImageRenderer } from './Renderers'

type Props = { content: string }

export default function Markdown({ content }: Props) {
  return (
    <ReactMarkdown
      components={{
        img: ImageRenderer,
        code: CodeRenderer,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
