import { getPosts } from '@/services'
import styles from '../../app/page.module.scss'
import PostCard from './PostCard'

type Props = {}

async function FeaturedPosts({}: Props) {
  const { featuredPostsContainer } = styles
  const posts = (await getPosts()) || []

  return (
    <section className={featuredPostsContainer}>
      {posts.map((post) => (
        <PostCard post={post} key={post.title}></PostCard>
      ))}
    </section>
  )
}

export default FeaturedPosts
