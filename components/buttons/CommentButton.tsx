'use client'
import { useEffect, useState } from 'react'
import styles from './feedbackBtn.module.scss'
import { getCommentsCount } from '@/services'
import Link from 'next/link'

type Props = {
  postId: string
  slug?: string
  onPage?: boolean
  showCount?: boolean
}

export default function CommentButton({
  postId,
  slug = '',
  onPage = false,
  showCount = true,
}: Props) {
  const [commentsCount, setCommentsCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    async function initialize() {
      setCommentsCount(await getCommentsCount(postId))
      setLoading(false)
    }
    initialize()
  }, [postId])
  const {
    Btn_container,
    commentBtn,
    Btn_wrapper,
    comment,
    commentCountContainer,
    commentSpinner,
    showCommentCount,
  } = styles

  return (
    <button className={`${Btn_container} ${commentBtn}`}>
      {loading ? (
        <div className={commentSpinner}></div>
      ) : (
        <div className={Btn_wrapper}>
          {onPage ? (
            <a href={`#comment-section-${postId}`}>
              <svg
                className={comment}
                width="24"
                height="24"
                viewBox="0 0 50 50"
              >
                <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z M 25 5.9375 C 36.714844 5.9375 46.0625 14.089844 46.0625 24 C 46.0625 33.910156 36.714844 42.0625 25 42.0625 C 22.996094 42.0625 21.050781 41.820313 19.21875 41.375 L 18.65625 41.25 L 18.28125 41.71875 C 18.28125 41.71875 15.390625 44.976563 10.78125 45.75 C 11.613281 44.257813 12.246094 42.871094 12.53125 41.8125 C 12.929688 40.332031 12.9375 39.3125 12.9375 39.3125 L 12.9375 38.8125 L 12.5 38.53125 C 7.273438 35.21875 3.9375 29.941406 3.9375 24 C 3.9375 14.089844 13.28125 5.9375 25 5.9375 Z" />
              </svg>
            </a>
          ) : (
            <Link href={`/post/${slug}#comment-section-${postId}`}>
              <svg
                className={comment}
                width="24"
                height="24"
                viewBox="0 0 50 50"
              >
                <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z M 25 5.9375 C 36.714844 5.9375 46.0625 14.089844 46.0625 24 C 46.0625 33.910156 36.714844 42.0625 25 42.0625 C 22.996094 42.0625 21.050781 41.820313 19.21875 41.375 L 18.65625 41.25 L 18.28125 41.71875 C 18.28125 41.71875 15.390625 44.976563 10.78125 45.75 C 11.613281 44.257813 12.246094 42.871094 12.53125 41.8125 C 12.929688 40.332031 12.9375 39.3125 12.9375 39.3125 L 12.9375 38.8125 L 12.5 38.53125 C 7.273438 35.21875 3.9375 29.941406 3.9375 24 C 3.9375 14.089844 13.28125 5.9375 25 5.9375 Z" />
              </svg>
            </Link>
          )}
        </div>
      )}

      <span
        className={`${commentCountContainer} ${
          showCount ? showCommentCount : ''
        }`}
      >
        {commentsCount}
      </span>
    </button>
  )
}
