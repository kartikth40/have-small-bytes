'use client'

import { CSSProperties, useState, useEffect } from 'react'
import styles from './feedbackBtn.module.scss'
import { useSession } from 'next-auth/react'
import {
  addPostLike,
  checkPostLike,
  deletePostLike,
  getPostLikes,
} from '@/services'
import { toast } from 'react-toastify'
import { sendLikeNotification } from '@/utils/functions'
export interface myCustomCSS extends CSSProperties {
  '--total-particles': number
  '--i': number
  '--color': string
}

type Props = {
  postId: string
  postAuthor: string
  postTitle: string
  postSlug: string
}

export default function LikeButton({
  postId,
  postAuthor,
  postTitle,
  postSlug,
}: Props) {
  const { data: session, status } = useSession()
  const [liked, setLiked] = useState<boolean>(false)
  const [allowLiking, setAllowLiking] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(0)
  const loading = status === 'loading'
  useEffect(() => {
    async function getCount() {
      const count: number = (await getPostLikes(postId)) || 0
      setLikeCount(count)
    }
    getCount()
  }, [postId])
  useEffect(() => {
    async function checkLike() {
      if (session && !loading) {
        const isLiked = await checkPostLike(postId, session.user.id)
        if (isLiked) {
          setLiked(true)
        }
      }
      if (!loading) {
        setAllowLiking(true)
      }
    }
    checkLike()
  }, [loading, postId, session])
  const {
    Btn_container,
    Btn_wrapper,
    ripple,
    heart,
    particles,
    particle,
    likeCountContainer,
    likeSpinner,
  } = styles

  async function handleLikeClick() {
    if (loading || updating) return

    // if not logged in
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

    if (!allowLiking) return

    setUpdating(true)
    // if liked before
    if (liked) {
      // delete
      setLiked(false)
      setLikeCount((prev) => prev - 1)
      const deleteLike = await deletePostLike(postId, session?.user.id)

      if (!deleteLike) {
        setLiked(true)
        toast.error('Something went wrong! Please try again later.')
      }
    } else {
      // add new like
      setLikeCount((prev) => prev + 1)
      setLiked(true)
      const result = await addPostLike(postId, session?.user.id)
      if (result) {
        // send notification
        const actorId = session?.user.id
        const actor = session?.user.name
        await sendLikeNotification(
          actor,
          actorId,
          postAuthor,
          postTitle,
          postSlug
        )
      } else {
        toast.error('Something went wrong! Please try again later.')
        setLiked(false)
      }
    }
    setLikeCount((await getPostLikes(postId)) || 0)
    setUpdating(false)
  }
  return (
    <button className={Btn_container}>
      {loading || !allowLiking ? (
        <div className={likeSpinner}></div>
      ) : (
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
      )}
      <span className={likeCountContainer}>{likeCount}</span>
    </button>
  )
}
