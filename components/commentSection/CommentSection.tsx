'use client'

import { useState, useEffect } from 'react'
import styles from './commentSection.module.scss'
import { getPostCommentType } from '@/utils/types/types'
import { addComment, getComments, getCommentsCount } from '@/services'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

type Props = { postId: string }

export default function CommentSection({ postId }: Props) {
  const { data: session, status } = useSession()
  const [currentComment, setCurrentComment] = useState<string>('')
  const [posting, setPosting] = useState<boolean>(false)
  const [showId, SetShowId] = useState<string>('')
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
    line,
    dropdown,
    dropdownContent,
    show,
    menuDot,
  } = styles
  async function handleSendComment() {
    if (currentComment.length > 0 && session) {
      setPosting(true)
      const result = addComment(currentComment, postId, session?.user.id)
      if (!result) {
        toast.error('something went wrong! Please try again later.')
      } else {
        setCurrentComment('')
      }
      setPosting(false)
    }
  }
  function handleDropdown(id: string) {
    SetShowId((prev) => {
      if (prev) return ''
      return id
    })
  }
  function handleEdit(id: string) {
    SetShowId('')
  }
  function handleDelete(id: string) {
    SetShowId('')
  }
  return (
    <section id={`comment-${postId}`} className={commentSectionContainer}>
      <h1 className={head}>{`Comments ${commentsCount}`}</h1>
      <div className={commentInputContainer}>
        <textarea
          rows={3}
          value={currentComment}
          onChange={(e) => setCurrentComment(e.target.value)}
        />
        <button
          disabled={status === 'loading' || posting}
          onClick={handleSendComment}
        >
          {posting || status === 'loading' ? 'Wait' : 'Post'}
        </button>
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
                <span className={line}></span>
                <div className={age}>9min ago</div>
                <div className={dropdown}>
                  <div onClick={() => handleDropdown(comment.id)}>
                    <span className={menuDot}></span>
                    <span className={menuDot}></span>
                    <span className={menuDot}></span>
                  </div>
                  <div
                    className={`${dropdownContent} ${
                      showId && showId === comment.id && show
                    }`}
                  >
                    <div onClick={() => handleEdit(comment.id)}>Edit</div>
                    <div onClick={() => handleDelete(comment.id)}>Delete</div>
                  </div>
                </div>
                <div className={replyContainer}>Reply</div>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
