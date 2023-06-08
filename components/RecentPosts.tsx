import { getRecentPosts, recentPosts } from '@/services'
import styles from '../app/page.module.scss'

type Props = {}

async function RecentPosts({}: Props) {
  const { recentPostsContainer, recentPostCard } = styles
  const posts = await getRecentPosts()

  return (
    <div className={recentPostsContainer}>
      {posts.map((post) => (
        <div className={recentPostCard}>{post.title}</div>
      ))}
    </div>
  )
}

export default RecentPosts
