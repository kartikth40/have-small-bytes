'use client'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ImageRenderer } from './Renderers'
import ReactSyntaxHighlighter from './ReactSyntaxHighlighter'

type Props = { content: string }

export default function Markdown({ content }: Props) {
  return (
    <ReactMarkdown
      components={{
        img: ImageRenderer,
        code: function ({ ...props }) {
          const { inline, children, className } = props
          if (!inline)
            return (
              <ReactSyntaxHighlighter language="javascript">
                {String(children)}
              </ReactSyntaxHighlighter>
            )
          return <code className={className}>{children}</code>
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
