'use client'

import { useState, useEffect } from 'react'
import styles from './commentSection.module.scss'
import { getPostCommentType } from '@/utils/types/types'
import { getComments, getCommentsCount } from '@/services'
import Image from 'next/image'

type Props = { postId: string }

export default function CommentSection({ postId }: Props) {
  const [currentComment, setCurrentComment] = useState<string>('')
  const [commentsCount, setCommentsCount] = useState<number>(0)
  const [comments, setComments] = useState<getPostCommentType[]>()
  useEffect(() => {
    async function initialize() {
      setCommentsCount(await getCommentsCount(postId))
      setComments(await getComments(postId))
    }
    initialize()
  }, [])
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
    <section id={`comment-${postId}`} className={commentSectionContainer}>
      <h1 className={head}>{`Comments ${commentsCount}`}</h1>
      <div className={commentInputContainer}>
        <textarea
          rows={3}
          value={currentComment}
          onChange={(e) => setCurrentComment(e.target.value)}
        />
        <button onClick={handleSendComment}>Send</button>
      </div>
      <div className={commentsContainer}>
        {comments &&
          comments.map((comment) => (
            <div key={comment.id} className={commentContainer}>
              <div className={readerContainer}>
                <div className={readerAvatar}>
                  <Image
                    src={comment.reader.photo.url}
                    width={24}
                    height={24}
                    alt={comment.reader.name}
                  />
                </div>
                <div className={readerName}>{comment.reader.name}</div>
              </div>
              <div className={commentContentContainer}>{comment.comment}</div>
              <div className={interact}>
                <div className={replyContainer}>Reply</div>
                <div className={age}>{comment.createdAt}</div>
              </div>
            </div>
          ))}
        <hr />
      </div>
    </section>
  )
}
