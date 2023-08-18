'use client'

import { useState, useEffect } from 'react'
import styles from './commentSection.module.scss'
import { getPostCommentType } from '@/utils/types/types'
import {
  addComment,
  commentExists,
  deleteComment,
  deleteCommentNotification,
  deleteCommentReplies,
  deleteCommentRepliesNotification,
  getCommentRepliesCount,
  getComments,
  getCommentsCount,
  sendNotification,
  updateComment,
} from '@/services'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import RepliesSection from './RepliesSection'
import { timeAgo } from '@/utils/functions'

type Props = {
  postId: string
  postSlug: string
  postAuthor: string
  postTitle: string
}

export default function CommentSection({
  postId,
  postSlug,
  postAuthor,
  postTitle,
}: Props) {
  const { data: session, status } = useSession()
  const [currentComment, setCurrentComment] = useState<string>('')
  const [hideComments, setHideComments] = useState<boolean>(true)
  const [currentEditingComment, setCurrentEditingComment] = useState<string>('')
  const [posting, setPosting] = useState<boolean>(false)
  const [openReplies, setOpenReplies] = useState<string>('')
  const [editing, setEditing] = useState<string>('')
  const [showId, SetShowId] = useState<string>('')
  const [commentsCount, setCommentsCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [comments, setComments] = useState<getPostCommentType[] | []>([])
  const [replies, setReplies] = useState<getPostCommentType[] | []>([])
  const [repliesCounts, setRepliesCounts] = useState<Map<string, number>>(
    new Map()
  )
  async function initializeComments() {
    setCommentsCount(await getCommentsCount(postId))
    setComments(await getComments(postId))
    setLoading(false)
  }

  useEffect(() => {
    initializeComments()
  }, [])

  useEffect(() => {
    const commentId = window.localStorage.getItem('commentId')
    const replyId = window.localStorage.getItem('replyId')
    if (!comments.length || !commentId) return

    if (hideComments) {
      setHideComments(false)
      return
    }
    document
      .getElementById(`comment-${commentId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })

    if (replyId && commentId) {
      if (openReplies !== commentId) {
        setOpenReplies(commentId)
        return
      }

      document
        .getElementById(`reply-${replyId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    window.localStorage.removeItem('commentId')
    window.localStorage.removeItem('replyId')
  }, [comments, hideComments, openReplies]) // eslint-disable-line react-hooks/exhaustive-deps

  async function initializeReplies() {
    if (!comments) return
    await Promise.all(
      comments?.map(async (c) => {
        const currentComment = c.id

        const repliesCountForThisComment: number = await getCommentRepliesCount(
          currentComment
        )
        setRepliesCounts(
          new Map(repliesCounts.set(currentComment, repliesCountForThisComment))
        )
      })
    )
  }
  useEffect(() => {
    if (comments) initializeReplies()
  }, [comments]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const {
    commentSectionContainer,
    mainCommentSection,
    showMe,
    unHideComments,
    commentsDropDownBtn,
    head,
    commentInputContainer,
    commentsContainer,
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
    opened,
    replyContainer,
    isAuthor,
    aboveCommentContent,
    countSpinner,
  } = styles
  async function handleSendComment() {
    if (!session) {
      toast.warn('please login to add your comment.', {
        toastId: 'do_not_allow_duplicate_comment',
      })
    }
    if (currentComment.length > 0 && session) {
      setPosting(true)
      const commentId = await addComment(
        currentComment,
        postId,
        session?.user.id
      )
      if (!commentId) {
        toast.error('something went wrong! Please try again later.', {
          toastId: 'error_add_cmt',
        })
        setPosting(false)
      } else {
        setCurrentComment('')
        await initializeComments()
        setPosting(false)

        const actorId = session?.user.id
        await sendNotification(
          'commented',
          actorId,
          postAuthor,
          postId,
          commentId
        )
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
    const result = await updateComment(id, currentEditingComment)
    if (!result) {
      toast.error('something went wrong! Please try again later.', {
        toastId: 'error_edit',
      })
    } else {
      await initializeComments()
    }
  }
  async function handleDelete(id: string) {
    SetShowId('')
    const sure = confirm('Are you sure you want to delete this comment ?')
    if (!sure) return
    await deleteCommentRepliesNotification(session?.user.id!, postAuthor, id)
    const repliesDeleted = await deleteCommentReplies(id)
    if (!repliesDeleted) {
      toast.error('something went wrong! Please try again later.', {
        toastId: 'error_dlt',
      })
      return
    }
    await deleteCommentNotification(session?.user.id!, postAuthor, id)
    const commentDeleted = await deleteComment(id)
    if (!commentDeleted) {
      toast.error('something went wrong! Please try again later.', {
        toastId: 'error_dlt',
      })
      return
    }
    await initializeComments()
  }

  async function handleReplyClick(commentId: string) {
    const isComment = await commentExists(commentId)
    if (!isComment) {
      toast.error(
        'The comment you are attempting to respond to has been deleted.',
        {
          toastId: 'error_dlted_already',
        }
      )
      return
    }

    const repliesCountForThisComment: number = await getCommentRepliesCount(
      commentId
    )
    setRepliesCounts(
      new Map(repliesCounts.set(commentId, repliesCountForThisComment))
    )

    setOpenReplies((prev) => {
      if (prev === '') return commentId
      if (prev === commentId) return ''
      return commentId
    })
  }

  return (
    <section
      id={`comment-section-${postId}`}
      className={commentSectionContainer}
    >
      <h1 className={head}>
        <span>
          Comments{' '}
          {loading ? (
            <span className={countSpinner}></span>
          ) : (
            <span>{commentsCount}</span>
          )}
        </span>
        <span
          onClick={() => setHideComments((prev) => !prev)}
          className={`${commentsDropDownBtn} ${!hideComments && showMe}`}
        ></span>
      </h1>
      <div
        className={`${mainCommentSection} ${!hideComments && unHideComments}`}
      >
        <div className={commentInputContainer}>
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
              <div
                key={comment.id}
                id={`comment-${comment.id}`}
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
                              if (comment.reader.id !== session?.user.id) return
                              setEditing(comment.id)
                              setCurrentEditingComment(comment.comment)
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
                        value={currentEditingComment}
                        autoFocus
                        onChange={(e) =>
                          setCurrentEditingComment(e.target.value)
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
                  <button
                    className={`${replyContainer} ${
                      openReplies === comment.id && opened
                    }`}
                    onClick={() => {
                      handleReplyClick(comment.id)
                    }}
                  >
                    Replies
                    <span>{repliesCounts?.get(comment.id) || 0}</span>
                  </button>
                  <span className={line}></span>
                  {comment.createdAt !== comment.updatedAt && (
                    <div className={edited}>Edited</div>
                  )}
                  <div className={age}>{timeAgo(comment.createdAt)}</div>
                </div>
                <RepliesSection
                  commentId={comment.id}
                  postId={postId}
                  postSlug={postSlug}
                  commenter={comment.reader.id}
                  postTitle={postTitle}
                  open={openReplies}
                  setOpen={setOpenReplies}
                  replies={replies}
                  setReplies={setReplies}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
