'use client'
import { getRecentPosts, widgetPost } from '@/services'
import styles from '../app/page.module.scss'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'

function RecentWidget() {
  const { postWidgetsContainer, postWidgetCard } = styles
  const [relatedPosts, setRelatedPosts] = useState<widgetPost[]>()
  useEffect(() => {
    async function run() {
      const posts = await getRecentPosts()
      setRelatedPosts(posts)
    }
    run()
  }, [])

  return (
    <div className={postWidgetsContainer}>
      <h2>{'Recent Posts'}</h2>
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

export default RecentWidget
