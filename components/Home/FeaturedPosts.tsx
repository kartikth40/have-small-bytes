import { getCategoryPosts, getFeaturedPosts } from '@/services'
import styles from '../../app/page.module.scss'
import FeaturedPostCard from './FeaturedPostCard'

type Props = { categorySlug?: string }

async function FeaturedPosts({ categorySlug = '' }: Props) {
  const { featuredPostsContainer, featuredPosts } = styles
  let posts = []
  if (!categorySlug) {
    posts = (await getFeaturedPosts()) || []
  } else {
    posts = (await getCategoryPosts(categorySlug)) || []
  }

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
