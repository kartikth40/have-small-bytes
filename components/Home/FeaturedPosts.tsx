import { getPosts } from '@/services'
import styles from '../../app/page.module.scss'
import FeaturedPostCard from './FeaturedPostCard'

type Props = {}

async function FeaturedPosts({}: Props) {
  const { featuredPostsContainer } = styles
  const posts = (await getPosts()) || []

  return (
    <section className={featuredPostsContainer}>
      {posts.map((post) => (
        <FeaturedPostCard post={post} key={post.title}></FeaturedPostCard>
      ))}
    </section>
  )
}

export default FeaturedPosts
