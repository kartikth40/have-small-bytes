import { getSimilarPosts } from '@/services'
import styles from '../app/page.module.scss'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'

type Props = { categories: string[]; slug: string }

async function SimilarWidget({ categories, slug }: Props) {
  const { postWidgetsContainer, postWidgetCard } = styles
  const posts = await getSimilarPosts(categories, slug)

  return (
    <div className={postWidgetsContainer}>
      <h2>{'Related Posts'}</h2>
      {posts.length === 0 && (
        <div style={{ textAlign: 'center' }}>0 related posts</div>
      )}
      {posts?.map((post) => (
        <div key={post.title} className={postWidgetCard}>
          <Image
            src={post.featuredImage.url}
            width={30}
            height={30}
            style={{ objectFit: 'cover' }}
            alt={post.title}
          />
          <div>
            <p>{moment(post.updatedAt).format('MMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SimilarWidget
