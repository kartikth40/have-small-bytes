import { post } from '@/services'
import styles from '../../app/page.module.scss'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'

type Props = { post: post }

function PostCard({ post }: Props) {
  const { postCard, postImage, title, summary, authorName } = styles
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

      <div className={title}>{post.title}</div>
      <div className={summary}>{post.summary}</div>
      <div className={authorName}>{post.author.name}</div>
    </div>
  )
}

export default PostCard
