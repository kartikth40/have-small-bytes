'use client'
import { getRecentPosts, getSimilarPosts, widgetPost } from '@/services'
import styles from '../app/page.module.scss'
import { useEffect, useState } from 'react'

type Props = {}

function PostWidget({ categories, slug }: Props) {
  const { recentPostsContainer, recentPostCard } = styles
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
    <div className={recentPostsContainer}>
      {relatedPosts?.map((post) => (
        <div key={post.title} className={recentPostCard}>
          {post.title}
        </div>
      ))}
    </div>
  )
}

export default PostWidget
