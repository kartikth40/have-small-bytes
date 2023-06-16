import { getCategoryPosts, getPosts } from '@/services'
import styles from '../../app/page.module.scss'
import PostCard from './PostCard'

type Props = { categorySlug?: string }

async function HomePagePosts({ categorySlug = '' }: Props) {
  const { postsContainer } = styles
  let posts
  if (!categorySlug) {
    posts = await getPosts()
    console.log(categorySlug)
  } else {
    posts = await getCategoryPosts(categorySlug)
  }

  return (
    <section className={postsContainer}>
      {posts.map((post) => (
        <PostCard post={post} key={post.title}></PostCard>
      ))}
    </section>
  )
}

export default HomePagePosts
