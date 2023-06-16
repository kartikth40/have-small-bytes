import { getPosts } from '@/services'
import styles from '../../app/page.module.scss'
import FeaturedPostCard from './FeaturedPostCard'

type Props = { category: string }

async function FeaturedPosts({ category }: Props) {
  const { featuredPostsContainer, featuredPosts } = styles
  const posts = (await getPosts()) || []

  return (
    <section className={featuredPostsContainer}>
      <h1>Featured Posts</h1>
      <div className={featuredPosts}>
        {posts.map((post) => (
          <FeaturedPostCard post={post} key={post.title} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedPosts
