import { getCategoryPosts, getFeaturedPosts } from '@/services'
import styles from '../../app/page.module.scss'
import { HeroCard, SideCard } from './FeaturedPostCard'
import { postsType } from '@/utils/types/types'

type Props = { categorySlug?: string }

async function FeaturedPosts({ categorySlug = '' }: Props) {
  let posts: postsType[] = []
  if (!categorySlug) {
    posts = (await getFeaturedPosts()) || []
  } else {
    posts = (await getCategoryPosts(categorySlug)) || []
  }

  if (posts.length === 0) return null

  const [hero, ...rest] = posts

  return (
    <section className={styles.featuredPostsContainer}>
      <h1>Featured Posts</h1>
      <div className={styles.spotlightGrid}>
        <HeroCard post={hero} />
        {rest.length > 0 && (
          <div className={styles.sideStack}>
            {rest.slice(0, 3).map((post) => (
              <SideCard post={post} key={post.slug} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedPosts
