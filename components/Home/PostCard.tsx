'use client'

import { postsType } from '@/utils/types/types'
import styles from '../../app/page.module.scss'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { myPortfolioURL } from '@/services'
import LikeButton from '../buttons/LikeButton'
import CommentButton from '../buttons/CommentButton'
import { useEffect, useState } from 'react'

type Props = { post: postsType }

function PostCard({ post }: Props) {
  const [authorId, setAuthorId] = useState<string>('/')
  useEffect(() => {
    async function setAuthor() {
      setAuthorId((await myPortfolioURL(post.author.id)) || '/')
    }
    setAuthor()
  }, [])

  const {
    postCard,
    postImage,
    title,
    summary,
    authorName,
    authorInfo,
    authorInfoContainer,
    authorImage,
    date,
    userFeedbackContainer,
    leftAlign,
    rightAlign,
    readTimeContainer,
    postReactionSection,
  } = styles
  return (
    <div className={postCard}>
      <div className={authorInfoContainer}>
        <Link
          href={authorId!}
          className={authorInfo}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className={authorImage}>
            <Image
              src={post.author.photo.url}
              style={{ objectFit: 'cover', borderRadius: '50%' }}
              sizes="(max-width: 768px) 40px, (max-width: 1200px) 50px, 40px"
              fill={true}
              alt={post.author.username}
            />
          </div>
          <p className={authorName}>{post.author.username}</p>
        </Link>

        <div className={date}>
          <p>{moment(post.updatedAt).format('MMM DD, YYYY')}</p>
        </div>
      </div>
      <Link href={`/post/${post.slug}`}>
        <div className={postImage}>
          <Image
            src={post.featuredImage.url}
            style={{ objectFit: 'cover', borderRadius: '.5rem' }}
            fill={true}
            alt={post.title}
          />
        </div>
      </Link>

      <h1>
        <Link href={`/post/${post.slug}`} className={title}>
          {post.title}
        </Link>
      </h1>
      <div className={summary}>{post.summary}</div>
      <div className={postReactionSection}>
        <div className={leftAlign}>
          <div className={userFeedbackContainer}>
            <LikeButton
              postId={post.id}
              postSlug={post.slug}
              postAuthor={post.author.id}
              postTitle={post.title}
            />
            <CommentButton postId={post.id} slug={post.slug} />
          </div>
        </div>
        <div className={rightAlign}>
          <div className={readTimeContainer}>{post.readTime} min read</div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
