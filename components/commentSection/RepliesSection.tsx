'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import styles from './commentSection.module.scss'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { getPostCommentType } from '@/utils/types/types'
import {
  deleteReplyNotification,
  addCommentReply,
  deleteComment,
  getCommentReplies,
  sendNotification,
  updateComment,
} from '@/services'
import { toast } from 'react-toastify'
import { timeAgo } from '@/utils/functions'

type Props = {
  commentId: string
  postId: string
  postSlug: string
  commenter: string
  postTitle: string
  open: string
  setOpen: Dispatch<SetStateAction<string>>
  replies: getPostCommentType[] | []
  setReplies: Dispatch<SetStateAction<getPostCommentType[]>>
}

export default function RepliesSection({
  commentId,
  postId,
  commenter,
  open,
  setOpen,
  replies,
  setReplies,
}: Props) {
  const { data: session, status } = useSession()
  const [currentReply, setCurrentReply] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [currentEditingReply, setCurrentEditingReply] = useState<string>('')
  const [posting, setPosting] = useState<boolean>(false)
  const [editing, setEditing] = useState<string>('')
  const [showId, SetShowId] = useState<string>('')
  const [loadNo, setLoadNo] = useState<number>(0)
  const [loadMore, setLoadMore] = useState<boolean>(true)

  async function initialize() {
    setReplies(await getCommentReplies(commentId, 0))
    setLoading(false)
  }
  useEffect(() => {
    if (open === commentId) {
      initialize()
    } else setLoading(true)

    if (open === '') {
      setLoadNo(0)
      setLoadMore(true)
    }
  }, [open, commentId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function reset() {
      SetShowId('')
    }
    if (showId) {
      document.body.addEventListener('click', reset)
    }

    return () => {
      document.body.removeEventListener('click', reset)
    }
  }, [showId])

  useEffect(() => {
    const repliesPerLoad = 5
    async function load() {
      const newReplies: getPostCommentType[] = await getCommentReplies(
        commentId,
        loadNo * repliesPerLoad
      )

      if (newReplies.length < repliesPerLoad) {
        setLoadMore(false)
      } else {
        setLoadMore(true)
      }
      setReplies((prev) => [...prev, ...newReplies])
    }
    if (loadNo === 0 || !loadMore) return
    load()
  }, [loadNo])

  const {
    replySectionContainer,
    replyInputContainer,
    repliesContainer,
    commentContainer,
    readerContainer,
    commentContentContainer,
    readerAvatar,
    readerName,
    interact,
    age,
    line,
    dropdown,
    dropdownContent,
    show,
    commentEditContainer,
    menuDot,
    myComment,
    letMEcomment,
    edited,
    expansion,
    loadMoreBtn,
    isAuthor,
    readjustLeftThreadHeight,
    aboveCommentContent,
    loadingReplies,
    skeleton,
    disabledLoadBtn,
  } = styles
  async function handleSendReply() {
    if (!session) {
      toast.warn('please login to add your reply.', {
        toastId: 'do_not_allow_duplicate_reply',
      })
    }
    if (currentReply.length > 0 && session) {
      setPosting(true)
      const replyId = await addCommentReply(
        currentReply,
        postId,
        session.user.id,
        commentId
      )
      if (!replyId) {
        toast.error('something went wrong! Please try again later.')
        setPosting(false)
      } else {
        setCurrentReply('')
        await initialize()
        setPosting(false)

        const actorId = session?.user.id
        await sendNotification('replied', actorId, commenter, postId, replyId)
      }
    }
  }
  function handleDropdown(id: string) {
    SetShowId((prev) => {
      if (prev) return ''
      return id
    })
  }
  async function handleEditComment(id: string) {
    setEditing('')
    SetShowId('')
    const result = await updateComment(id, currentEditingReply)
    if (!result) {
      toast.error('something went wrong! Please try again later.')
    } else {
      await initialize()
    }
  }
  async function handleDelete(id: string) {
    SetShowId('')
    const sure = confirm('Are you sure you want to delete this reply ?')
    if (!sure) return
    await deleteReplyNotification(session?.user.id!, commenter, id)
    const result = await deleteComment(id)
    if (!result) {
      toast.error('something went wrong! Please try again later.')
    } else {
      await initialize()
    }
  }

  return (
    open === commentId && (
      <section
        className={`${replySectionContainer} ${
          replies && replies?.length > 5 && readjustLeftThreadHeight
        }`}
      >
        {loading ? (
          <div className={loadingReplies}>
            <div className={skeleton}></div>
          </div>
        ) : (
          <div className={repliesContainer}>
            {replies &&
              replies.map((comment) => (
                <div
                  key={comment.id}
                  id={`reply-${comment.id}`}
                  className={commentContainer}
                >
                  <div className={aboveCommentContent}>
                    <div className={readerContainer}>
                      <div className={readerAvatar}>
                        <Image
                          src={comment.reader.photo.url}
                          width={24}
                          height={24}
                          alt={comment.reader.name}
                          style={{ borderRadius: '50%' }}
                        />
                      </div>
                      <div
                        className={`${readerName} ${
                          comment.reader.id === session?.user.id
                            ? myComment
                            : null
                        }`}
                      >
                        {comment.reader.name}
                      </div>
                      {comment.reader.isAuthor && (
                        <div className={isAuthor}>Author</div>
                      )}
                    </div>
                    <div>
                      {comment.reader.id === session?.user.id && (
                        <div className={dropdown}>
                          <button
                            disabled={editing !== ''}
                            onClick={() => handleDropdown(comment.id)}
                          >
                            <span className={menuDot}></span>
                            <span className={menuDot}></span>
                            <span className={menuDot}></span>
                          </button>
                          <div
                            className={`${dropdownContent} ${
                              showId && showId === comment.id && show
                            }`}
                          >
                            <div
                              onClick={() => {
                                if (comment.reader.id !== session?.user.id)
                                  return
                                setEditing(comment.id)
                                setCurrentEditingReply(comment.comment)
                                SetShowId('')
                              }}
                            >
                              Edit
                            </div>
                            <div onClick={() => handleDelete(comment.id)}>
                              Delete
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={commentContentContainer}>
                    {editing === comment.id ? (
                      <div className={commentEditContainer}>
                        <textarea
                          rows={3}
                          autoFocus
                          value={currentEditingReply}
                          onChange={(e) =>
                            setCurrentEditingReply(e.target.value)
                          }
                        />
                        <div>
                          <button onClick={() => handleEditComment(comment.id)}>
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditing('')
                              SetShowId('')
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      comment.comment
                    )}
                  </div>
                  <div className={interact}>
                    <span className={line}></span>
                    {comment.createdAt !== comment.updatedAt && (
                      <div className={edited}>Edited</div>
                    )}
                    <div className={age}>{timeAgo(comment.createdAt)}</div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {!loading ? (
          <>
            {replies && replies.length >= 5 && (
              <div className={expansion}>
                <button
                  onClick={() => {
                    setOpen('')
                  }}
                  className={`${!loadMore && disabledLoadBtn}`}
                >
                  hide all
                </button>

                <button
                  onClick={() => setLoadNo((prev) => prev + 1)}
                  className={`${loadMoreBtn} ${!loadMore && disabledLoadBtn}`}
                >
                  load more
                </button>
              </div>
            )}

            <div className={replyInputContainer}>
              <div className={letMEcomment}>
                {session && (
                  <Image
                    src={session?.user.photo?.url!}
                    width={24}
                    height={24}
                    alt={session?.user.name!}
                    style={{ borderRadius: '50%' }}
                  />
                )}
              </div>
              <textarea
                rows={1}
                value={currentReply}
                onChange={(e) => setCurrentReply(e.target.value)}
              />
              <div>
                <button
                  disabled={status === 'loading' || posting}
                  onClick={handleSendReply}
                >
                  {posting || status === 'loading' ? 'Wait' : 'reply'}
                </button>
                <button
                  style={{ marginLeft: '1em' }}
                  onClick={() => {
                    setOpen('')
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        ) : null}
      </section>
    )
  )
}
