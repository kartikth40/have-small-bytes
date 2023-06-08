'use client'
import { getRecentPosts, getSimilarPosts, widgetPost } from '@/services'
import styles from '../app/page.module.scss'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'

type Props = {}

function PostWidget({ categories, slug }: Props) {
  const { postWidgetsContainer, postWidgetCard } = styles
  const [relatedPosts, setRelatedPosts] = useState<widgetPost[]>()
  useEffect(() => {
    async function run() {
      if (slug) {
        const posts = await getSimilarPosts()
        setRelatedPosts(posts)
      } else {
        const posts = await getRecentPosts()
        setRelatedPosts(posts)
      }
    }
    run()
  }, [])

  return (
    <div className={postWidgetsContainer}>
      <h3>{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts?.map((post) => (
        <div key={post.title} className={postWidgetCard}>
          <Image
            src={post.featuredImage.url}
            width={30}
            height={30}
            style={{ objectFit: 'cover' }}
            alt={post.title}
          />
          <div>
            <p>{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
