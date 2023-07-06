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
    commentContainer,
    readerContainer,
    commentContentContainer,
    readerAvatar,
    readerName,
    interact,
    replyContainer,
    age,
  } = styles
  function handleSendComment() {}
  return (
    <section className={commentSectionContainer}>
      <h1 className={head}>Comments</h1>
      <div className={commentInputContainer}>
        <textarea
          rows={6}
          value={currentComment}
          onChange={(e) => setCurrentComment(e.target.value)}
        />
        <button onClick={handleSendComment}>Send</button>
      </div>
      <div className={commentsContainer}>
        <div className={commentContainer}>
          <div className={readerContainer}>
            <div className={readerAvatar}>^_^</div>
            <div className={readerName}>Kartik Thakur</div>
          </div>
          <div className={commentContentContainer}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
            veniam voluptates earum commodi suscipit vero velit labore
            reiciendis odio quos ducimus necessitatibus, soluta, accusantium
            unde fugiat, qui repellendus alias ullam?
          </div>
          <div className={interact}>
            <div className={replyContainer}>Reply</div>
            <div className={age}>9 min</div>
          </div>
        </div>
        <hr />
        <div className={commentContainer}>
          <div className={readerContainer}>
            <div className={readerAvatar}>^_^</div>
            <div className={readerName}>Zolo</div>
          </div>
          <div className={commentContentContainer}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            repellendus dolores facilis error nisi nam quia necessitatibus hic
            sequi quod explicabo excepturi, facere modi. Culpa, totam nulla.
            Doloremque, alias dolorum?
          </div>
          <div className={interact}>
            <div className={replyContainer}>Reply</div>
            <div className={age}>10 hr</div>
          </div>
        </div>
      </div>
    </section>
  )
}
