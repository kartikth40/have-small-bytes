import styles from '../../app/page.module.scss'
import PostCard from './PostCard'
import { postsType } from '@/utils/types/types'
import LoadMoreBtn from '../buttons/LoadMoreBtn'
import { getCategoryPosts, getPosts, myPortfolioURL } from '@/services'

type Props = { categorySlug?: string }

async function HomePagePosts({ categorySlug = '' }: Props) {
  let posts: postsType[]
  if (!categorySlug) {
    posts = await getPosts()
  } else {
    posts = await getCategoryPosts(categorySlug)
  }

  const authorUrl = posts.length > 0
    ? (await myPortfolioURL(posts[0].author.id)) ?? '/'
    : '/'

  const { postsContainer } = styles

  return (
    <section className={postsContainer}>
      {posts?.map((post) => (
        <PostCard post={post} authorUrl={authorUrl} key={post.title} />
      ))}
      <LoadMoreBtn categorySlug={categorySlug} authorUrl={authorUrl} />
    </section>
  )
}

export default HomePagePosts
