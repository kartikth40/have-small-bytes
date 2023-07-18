'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import styles from './commentSection.module.scss'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { getPostCommentType } from '@/utils/types/types'
import {
  addCommentReply,
  deleteComment,
  getCommentReplies,
  updateComment,
} from '@/services'
import { toast } from 'react-toastify'
import { timeAgo } from '@/utils/functions'

type Props = {
  commentId: string
  postId: string
  open: string
  setOpen: Dispatch<SetStateAction<string>>
}

export default function RepliesSection({
  commentId,
  postId,
  open,
  setOpen,
}: Props) {
  const { data: session, status } = useSession()
  const [currentReply, setCurrentReply] = useState<string>('')
  const [currentEditingReply, setCurrentEditingReply] = useState<string>('')
  const [posting, setPosting] = useState<boolean>(false)
  const [expand, setExpand] = useState<boolean>(false)
  const [editing, setEditing] = useState<string>('')
  const [showId, SetShowId] = useState<string>('')
  const [replies, setReplies] = useState<getPostCommentType[]>()
  async function initialize() {
    setReplies(await getCommentReplies(commentId))
  }
  useEffect(() => {
    if (open === commentId) initialize()
  }, [open])
  const {
    replySectionContainer,
    replyInputContainer,
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
    expansion,
    isAuthor,
  } = styles
  async function handleSendReply() {
    if (currentReply.length > 0 && session) {
      setPosting(true)
      const result = await addCommentReply(
        currentReply,
        postId,
        session.user.id,
        commentId
      )
      if (!result) {
        toast.error('something went wrong! Please try again later.')
      } else {
        setCurrentReply('')
        await initialize()
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
    const result = await deleteComment(id)
    if (!result) {
      toast.error('something went wrong! Please try again later.')
    } else {
      await initialize()
    }
  }

  return (
    open === commentId && (
      <section className={replySectionContainer}>
        <div className={commentsContainer}>
          {replies &&
            replies.map(
              (comment, idx) =>
                idx < (expand ? replies.length : 5) && (
                  <div key={comment.id} className={commentContainer}>
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
                    <div className={commentContentContainer}>
                      {editing === comment.id ? (
                        <div className={commentEditContainer}>
                          <textarea
                            rows={3}
                            value={currentEditingReply}
                            onChange={(e) =>
                              setCurrentEditingReply(e.target.value)
                            }
                          />
                          <div>
                            <button
                              onClick={() => handleEditComment(comment.id)}
                            >
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
                )
            )}
          {replies && replies?.length > 5 && (
            <div
              className={expansion}
              onClick={() => {
                if (expand) setOpen('')
                setExpand((prev) => !prev)
              }}
            >
              <span>{expand ? 'hide all' : 'show all...'}</span>
            </div>
          )}
        </div>
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
            autoFocus={!!open}
            onChange={(e) => setCurrentReply(e.target.value)}
          />
          <div>
            <button
              disabled={status === 'loading' || posting}
              onClick={handleSendReply}
            >
              {posting || status === 'loading' ? 'Wait' : 'reply'}
            </button>
            <button style={{ marginLeft: '1em' }} onClick={() => setOpen('')}>
              Close
            </button>
          </div>
        </div>
      </section>
    )
  )
}
