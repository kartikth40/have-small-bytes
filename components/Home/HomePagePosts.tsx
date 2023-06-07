import { getPosts, post } from '@/services'
import styles from '../../app/page.module.scss'
import PostCard from './PostCard'

type Props = {}

async function HomePagePosts({}: Props) {
  const { postsContainer } = styles
  const posts: post[] = (await getPosts()) || []

  return (
    <section className={postsContainer}>
      {posts.map((post) => (
        <PostCard post={post} key={post.title}></PostCard>
      ))}
    </section>
  )
}

export default HomePagePosts
