'use client'

import { postsType } from '@/utils/types/types'
import styles from '../../app/page.module.scss'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import LikeButton from '../buttons/LikeButton'
import CommentButton from '../buttons/CommentButton'
import ShareButton from '../buttons/ShareButton'
import PostCardSkeleton from './PostCardSkeleton'
import ViewCounter from '../BlogPost/ViewCounter'
import { useEffect, useState } from 'react'

type Props = { post: postsType; authorUrl: string }

export default function PostCard({ post, authorUrl }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <PostCardSkeleton />

  const {
    postCard, postImage, title, summary, authorName, authorInfo,
    authorInfoContainer, authorImage, date, userFeedbackContainer,
    leftAlign, rightAlign, readTimeContainer, postReactionSection,
  } = styles

  return (
    <div className={postCard}>
      <div className={authorInfoContainer}>
        <Link href={authorUrl} className={authorInfo} rel="noopener noreferrer" target="_blank">
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
          <ViewCounter slug={post.slug} readOnly badge />
        </div>
      </Link>
      <h1>
        <Link href={`/post/${post.slug}`} className={title}>{post.title}</Link>
      </h1>
      <div className={summary}>{post.summary}</div>
      <div className={postReactionSection}>
        <div className={leftAlign}>
          <div className={userFeedbackContainer}>
            <LikeButton postId={post.id} postSlug={post.slug} postAuthor={post.author.id} postTitle={post.title} />
            <CommentButton postId={post.id} slug={post.slug} />
            <ShareButton slug={post.slug} title={post.title} />
          </div>
        </div>
        <div className={rightAlign}>
          <div className={readTimeContainer}>{post.readTime} min read</div>
        </div>
      </div>
    </div>
  )
}
