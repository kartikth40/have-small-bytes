import { postsType } from '@/utils/types/types'
import styles from '../../app/page.module.scss'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { getPostLikes, myPortfolioURL } from '@/services'
import LikeButton from '../buttons/LikeButton'
import CommentButton from '../buttons/CommentButton'

type Props = { post: postsType }

async function PostCard({ post }: Props) {
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
    icon,
    userFeedbackContainer,
    like,
    comment,
  } = styles
  const authorId: string = (await myPortfolioURL(post.author.id)) || '/'
  const likesCount: number = (await getPostLikes(post.id)) || 0
  return (
    <div className={postCard}>
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

      <div className={authorInfoContainer}>
        <div className={userFeedbackContainer}>
          <div className={like}>
            <LikeButton postId={post.id} />
            <span>{likesCount}</span>
          </div>
          <div className={comment}>
            <CommentButton />
            <span>0</span>
          </div>
        </div>
        <div className={date}>
          <div className={icon}>
            <Image
              src="https://img.icons8.com/fluency-systems-regular/48/calendar--v1.png"
              width={48}
              height={48}
              alt="cal"
            />
          </div>
          <p>{moment(post.createdAt).format('MMM DD, YYYY')}</p>
        </div>

        <Link
          href={authorId}
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
              alt={post.author.name}
            />
          </div>
          <p className={authorName}>{post.author.name}</p>
        </Link>
      </div>
    </div>
  )
}

export default PostCard
