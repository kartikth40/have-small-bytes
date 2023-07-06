'use client'

import { useState } from 'react'
import styles from './commentSection.module.scss'

type Props = {}

export default function CommentSection({}: Props) {
  const [currentComment, setCurrentComment] = useState<string>('')
  const {
    commentSectionContainer,
    head,
    commentInputContainer,
    commentsContainer,
  } = styles
  function handleSendComment() {}
  return (
    <section className={commentSectionContainer}>
      <h1 className={head}>Comments</h1>
      <div className={commentInputContainer}>
        <input
          type="text"
          value={currentComment}
          onChange={(e) => setCurrentComment(e.target.value)}
        />
        <button onClick={handleSendComment}>Send</button>
      </div>
      <div className={commentsContainer}></div>
    </section>
  )
}
