'use client'

import { useState, useEffect } from 'react'
import styles from './commentSection.module.scss'
import { getPostCommentType } from '@/utils/types/types'
import {
  addComment,
  deleteComment,
  getComments,
  getCommentsCount,
  updateComment,
} from '@/services'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import RepliesSection from './RepliesSection'
import { timeAgo } from '@/utils/functions'

type Props = { postId: string }

export default function CommentSection({ postId }: Props) {
  const { data: session, status } = useSession()
  const [currentComment, setCurrentComment] = useState<string>('')
  const [currentEditingComment, setCurrentEditingComment] = useState<string>('')
  const [posting, setPosting] = useState<boolean>(false)
  const [openReplies, setOpenReplies] = useState<boolean>(false)
  const [editing, setEditing] = useState<string>('')
  const [showId, SetShowId] = useState<string>('')
  const [commentsCount, setCommentsCount] = useState<number>(0)
  const [comments, setComments] = useState<getPostCommentType[]>()
  async function initialize() {
    setCommentsCount(await getCommentsCount(postId))
    setComments(await getComments(postId))
  }
  useEffect(() => {
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
    commentEditContainer,
    menuDot,
    myComment,
    letMEcomment,
    edited,
  } = styles
  async function handleSendComment() {
    if (currentComment.length > 0 && session) {
      setPosting(true)
      const result = await addComment(currentComment, postId, session?.user.id)
      if (!result) {
        toast.error('something went wrong! Please try again later.')
      } else {
        setCurrentComment('')
        console.log('initialze')
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
    const result = await updateComment(id, currentEditingComment)
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
    <section id={`comment-${postId}`} className={commentSectionContainer}>
      <h1 className={head}>{`Comments ${commentsCount}`}</h1>
      <div className={commentInputContainer}>
        <div className={letMEcomment}>
          {session && (
            <Image
              src={session?.user.photo?.url!}
              width={24}
              height={24}
              alt={session?.user.name!}
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
                <div
                  className={`${readerName} ${
                    comment.reader.id === session?.user.id ? myComment : null
                  }`}
                >
                  {comment.reader.name}
                </div>
              </div>
              <div className={commentContentContainer}>
                {editing === comment.id ? (
                  <div className={commentEditContainer}>
                    <textarea
                      rows={3}
                      value={currentEditingComment}
                      onChange={(e) => setCurrentEditingComment(e.target.value)}
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
                      <div onClick={() => handleDelete(comment.id)}>Delete</div>
                    </div>
                  </div>
                )}
                <button
                  className={replyContainer}
                  onClick={() => {
                    setOpenReplies((prev) => !prev)
                  }}
                >
                  Reply
                </button>
              </div>
              <RepliesSection
                commentId={comment.id}
                open={openReplies}
                setOpen={setOpenReplies}
              />
            </div>
          ))}
      </div>
    </section>
  )
}
