import { getPostDetails } from '@/services'
import styles from '../../app/post/[slug]/page.module.scss'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default async function BlogPost({ slug }: { slug: string }) {
  const {
    blogPostContainer,
    postContent,
    authorInfoContainer,
    date,
    icon,
    authorInfo,
    authorName,
    authorImage,
  } = styles

  const post = await getPostDetails(slug)

  return (
    <div className={blogPostContainer}>
      <h1>{post.title}</h1>
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
          <p className={authorName}>{post.author.name}</p>
        </Link>
        <div className={date}>
          <div className={icon}>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/fluency-systems-regular/48/calendar--v1.png"
              alt="calendar--v1"
            />
          </div>
          <p>{moment(post.createdAt).format('MMM DD, YYYY')}</p>
        </div>
      </div>
      <div className={postContent}>
        <ReactMarkdown>{post.content.markdown}</ReactMarkdown>
      </div>
    </div>
  )
}
