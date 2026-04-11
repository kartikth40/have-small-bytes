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
import { showAuthToast, restoreAuthRedirectState, clearAuthRedirectState } from '@/utils/functions/authToast'

type Props = {
  postId: string
  postSlug: string
  postAuthor: string
  postTitle: string
}

const MAX_COMMENT_LENGTH = 500

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
  const [confirmDeleteId, setConfirmDeleteId] = useState<string>('')
  const [commentsCount, setCommentsCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [comments, setComments] = useState<getPostCommentType[] | []>([])
  const [repliesCounts, setRepliesCounts] = useState<Map<string, number>>(
    new Map()
  )
  async function initializeComments() {
    setCommentsCount(await getCommentsCount(postId))
    setComments(await getComments(postId))
    setLoading(false)
  }

  function setObserver(id: string) {
    const element = document.getElementById(id) as HTMLElement
    if (!element) return
    const intersectionObserver = new IntersectionObserver((entries) => {
      let [entry] = entries
      if (entry.isIntersecting) {
        intersectionObserver.disconnect()
        element.classList.add(highlight)
      }
    })
    intersectionObserver.observe(element)
  }

  useEffect(() => {
    initializeComments()

    // restore pending comment after signin redirect
    if (session) {
      const { pendingComment, scrollToSection } = restoreAuthRedirectState()
      if (pendingComment) {
        setCurrentComment(pendingComment)
        setHideComments(false)
        clearAuthRedirectState()
      }
      if (scrollToSection) {
        setTimeout(() => {
          document.getElementById(scrollToSection)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 500)
        clearAuthRedirectState()
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (showId && !(e.target as Element).closest('[data-dropdown]')) {
        SetShowId('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showId])

  useEffect(() => {
    const commentId = window.localStorage.getItem('commentId')
    const replyId = window.localStorage.getItem('replyId')
    if (!comments.length || !commentId) return

    if (hideComments) {
      setHideComments(false)
      return
    }
    if (!replyId) setObserver(`comment-${commentId}`)

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
    highlight,
  } = styles
  async function handleSendComment() {
    if (!session) {
      showAuthToast(
        typeof window !== 'undefined' ? window.location.pathname : undefined,
        {
          pendingComment: currentComment || undefined,
          scrollToSection: `comment-section-${postId}`,
        }
      )
      return
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
    setConfirmDeleteId(id)
  }

  async function confirmDelete(id: string) {
    setConfirmDeleteId('')
    await deleteCommentRepliesNotification(session?.user.id!, postAuthor, id)
    const repliesDeleted = await deleteCommentReplies(id)
    if (!repliesDeleted) {
      toast.error('something went wrong! Please try again later.', { toastId: 'error_dlt' })
      return
    }
    await deleteCommentNotification(session?.user.id!, postAuthor, id)
    const commentDeleted = await deleteComment(id)
    if (!commentDeleted) {
      toast.error('something went wrong! Please try again later.', { toastId: 'error_dlt' })
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
                alt={session?.user.username!}
                style={{ borderRadius: '50%' }}
              />
            )}
          </div>
          <div style={{ position: 'relative', width: '100%' }}>
            <textarea
              rows={3}
              value={currentComment}
              maxLength={MAX_COMMENT_LENGTH}
              onChange={(e) => setCurrentComment(e.target.value)}
              placeholder="Write a comment..."
              style={{ width: '100%', paddingBottom: '1.5em' }}
            />
            <span style={{ position: 'absolute', bottom: '1.5em', right: '0.6em', fontSize: '0.7em', opacity: 0.4, pointerEvents: 'none' }}>
              {currentComment.length}/{MAX_COMMENT_LENGTH}
            </span>
          </div>
          <button
            disabled={status === 'loading' || posting}
            onClick={handleSendComment}
          >
            {posting || status === 'loading' ? 'Wait' : 'Post'}
          </button>
        </div>
        <div className={commentsContainer}>
          {!loading && comments.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2em', opacity: 0.5, fontSize: '0.9em' }}>
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
          {comments &&
            comments.map((comment) => (
              <div
                key={comment.id}
                id={`comment-${comment.id}`}
                className={commentContainer}
              >
                {confirmDeleteId === comment.id && (
                  <div style={{ display: 'flex', gap: '0.5em', alignItems: 'center', padding: '0.5em', marginBottom: '0.5em', background: 'var(--color-back-05)', borderRadius: '5px', fontSize: '0.85em' }}>
                    <span style={{ flex: 1 }}>Delete this comment?</span>
                    <button onClick={() => confirmDelete(comment.id)} style={{ cursor: 'pointer', border: 'none', borderRadius: '4px', padding: '0.3em 0.8em', background: 'var(--color-incorrect-red)', color: '#fff' }}>Delete</button>
                    <button onClick={() => setConfirmDeleteId('')} style={{ cursor: 'pointer', border: '1px solid var(--color-back-2)', borderRadius: '4px', padding: '0.3em 0.8em', background: 'transparent', color: 'var(--color-foreground)' }}>Cancel</button>
                  </div>
                )}
                <div className={aboveCommentContent}>
                  <div className={readerContainer}>
                    <div className={readerAvatar}>
                      <Image
                        src={comment.reader.photo.url}
                        width={32}
                        height={32}
                        alt={comment.reader.username}
                        style={{ borderRadius: '50%' }}
                      />
                    </div>
                    <div
                      className={`${readerName} ${
                        comment.reader.id === session?.user.id
                          ? myComment
                          : null
                      }
                      `}
                    >
                      {comment.reader.username}
                    </div>
                    {comment.reader.isAuthor && (
                      <div className={isAuthor}>Author</div>
                    )}
                    <div className={age}>{timeAgo(comment.createdAt)}</div>
                    {comment.createdAt !== comment.updatedAt && (
                      <div className={edited}>edited</div>
                    )}
                  </div>
                  <div>
                    {comment.reader.id === session?.user.id && (
                      <div className={dropdown} data-dropdown>
                        <button
                          disabled={editing !== ''}
                          onClick={() => {
                            showId ? SetShowId('') : SetShowId(comment.id)
                          }}
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
                      <div style={{ position: 'relative', width: '100%' }}>
                        <textarea
                          rows={3}
                          value={currentEditingComment}
                          maxLength={MAX_COMMENT_LENGTH}
                          autoFocus
                          onChange={(e) => setCurrentEditingComment(e.target.value)}
                          style={{ width: '100%', paddingBottom: '1.5em' }}
                        />
                        <span style={{ position: 'absolute', bottom: '1em', right: '0.6em', fontSize: '0.7em', opacity: 0.4, pointerEvents: 'none' }}>
                          {currentEditingComment.length}/{MAX_COMMENT_LENGTH}
                        </span>
                      </div>
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
                  {/* <span className={line}></span> */}
                </div>
                <RepliesSection
                  commentId={comment.id}
                  postId={postId}
                  postSlug={postSlug}
                  commenter={comment.reader.id}
                  postTitle={postTitle}
                  open={openReplies}
                  setOpen={setOpenReplies}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
