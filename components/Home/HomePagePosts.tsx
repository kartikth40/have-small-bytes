import { getPosts } from '@/services'
import styles from '../../app/page.module.scss'
import PostCard from './PostCard'
import { postsType } from '@/utils/types'

type Props = {}

async function HomePagePosts({}: Props) {
  const { postsContainer } = styles
  const posts: postsType[] = await getPosts()

  return (
    <section className={postsContainer}>
      {posts.map((post) => (
        <PostCard post={post} key={post.title}></PostCard>
      ))}
    </section>
  )
}

export default HomePagePosts
