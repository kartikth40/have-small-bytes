'use client'

import { CSSProperties, useState, useEffect } from 'react'
import styles from './feedbackBtn.module.scss'
import { useSession } from 'next-auth/react'
import { addPostLike, checkPostLike, getPostLikes } from '@/services'
import { toast } from 'react-toastify'
export interface myCustomCSS extends CSSProperties {
  '--total-particles': number
  '--i': number
  '--color': string
}

type Props = { postId: string }

export default function LikeButton({ postId }: Props) {
  const { data: session, status } = useSession()
  const [liked, setLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(0)
  const loading = status === 'loading'
  useEffect(() => {
    async function getCount() {
      const count: number = (await getPostLikes(postId)) || 0
      setLikeCount(count)
    }
    getCount()
  })
  useEffect(() => {
    async function isLiked() {
      if (session) {
        const liked = await checkPostLike(postId, session.user.id)
        if (liked) {
          setLiked(true)
        }
      }
    }
    isLiked()
  }, [loading])
  const {
    Btn_container,
    Btn_wrapper,
    ripple,
    heart,
    particles,
    particle,
    likeCountContainer,
  } = styles

  async function handleLikeClick() {
    if (loading) return

    if (!session) {
      setLiked(true)
      const timeoutId = setTimeout(() => {
        setLiked(false)
        clearTimeout(timeoutId)
      }, 1000)
      toast.warn('please login to give your feedback.', {
        toastId: 'do_not_allow_duplicate',
      })
      return
    }
    if (liked) {
      // delete
      setLiked(false)
      return
    }

    setLiked(true)
    const result = await addPostLike(postId, session?.user.id)
    if (!result) {
      toast.error('Something went wrong! Please try later.')
      setLiked(false)
    }
  }
  return (
    <button className={Btn_container}>
      <div className={Btn_wrapper}>
        <input
          disabled={loading}
          type="checkbox"
          id="like_id"
          name="check"
          checked={liked}
          onChange={() => {}}
        />
        <div className={ripple}></div>
        <label htmlFor="like_id" onClick={handleLikeClick}>
          <svg className={heart} width="24" height="24" viewBox="0 0 24 24">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
          </svg>
        </label>

        <div
          className={particles}
          style={{ '--total-particles': 6 } as myCustomCSS}
        >
          <div
            className={particle}
            style={{ '--i': 1, '--color': '#7642F0' } as myCustomCSS}
          ></div>
          <div
            className={particle}
            style={{ '--i': 2, '--color': '#AFD27F' } as myCustomCSS}
          ></div>
          <div
            className={particle}
            style={{ '--i': 3, '--color': '#DE8F4F' } as myCustomCSS}
          ></div>
          <div
            className={particle}
            style={{ '--i': 4, '--color': '#D0516B' } as myCustomCSS}
          ></div>
          <div
            className={particle}
            style={{ '--i': 5, '--color': '#5686F2' } as myCustomCSS}
          ></div>
          <div
            className={particle}
            style={{ '--i': 6, '--color': '#D53EF3' } as myCustomCSS}
          ></div>
        </div>
      </div>
      <span className={likeCountContainer}>{likeCount}</span>
    </button>
  )
}
