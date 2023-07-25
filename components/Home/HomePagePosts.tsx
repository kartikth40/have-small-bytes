import styles from '../../app/page.module.scss'
import PostCard from './PostCard'
import { postsType } from '@/utils/types/types'
import LoadMoreBtn from '../buttons/LoadMoreBtn'
import { getCategoryPosts, getPosts } from '@/services'

type Props = { categorySlug?: string }

async function HomePagePosts({ categorySlug = '' }: Props) {
  let posts: postsType[]
  if (!categorySlug) {
    posts = await getPosts()
  } else {
    posts = await getCategoryPosts(categorySlug)
  }

  const { postsContainer } = styles

  return (
    <section className={postsContainer}>
      {posts?.map((post) => (
        <PostCard post={post} key={post.title}></PostCard>
      ))}
      <LoadMoreBtn categorySlug={categorySlug} />
    </section>
  )
}

export default HomePagePosts
