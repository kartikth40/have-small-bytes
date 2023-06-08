import { post } from '@/services'
import styles from '../../app/page.module.scss'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'

type Props = { post: post }

function PostCard({ post }: Props) {
  const {
    postCard,
    postImage,
    title,
    summary,
    authorName,
    authorInfo,
    authorInfoContainer,
    authorImage,
  } = styles
  return (
    <div className={postCard}>
      <div className={postImage}>
        <Image
          src={post.featuredImage.url}
          style={{ objectFit: 'cover', borderRadius: '.5rem' }}
          fill={true}
          alt={post.title}
        />
      </div>

      <h1>
        <Link href={`/post/${post.slug}`} className={title}>
          {post.title}
        </Link>
      </h1>
      <div className={summary}>{post.summary}</div>
      <div className={authorInfoContainer}>
        <Link href={`author/${post.author.id}`} className={authorInfo}>
          <div className={authorImage}>
            <Image
              src={post.author.photo.url}
              style={{ objectFit: 'cover', borderRadius: '50%' }}
              sizes="(max-width: 768px) 40px, (max-width: 1200px) 50px, 40px"
              fill={true}
              alt={post.author.name}
            />
          </div>
          <div className={authorName}>{post.author.name}</div>
        </Link>
      </div>
    </div>
  )
}

export default PostCard
