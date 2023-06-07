import PostCard from '@/components/PostCard'
import styles from './page.module.scss'
import RecentPosts from '@/components/RecentPosts'
import Categories from '@/components/Categories'
import Header from '@/components/Header'

const posts = [
  { title: 'React Testing', summary: 'Learn React Testing' },
  { title: 'React Tailwind', summary: 'Learn React with Tailwind' },
]

export default function Home() {
  const {
    main,
    featuredPostsContainer,
    contentContainer,
    postsContainer,
    aside,
  } = styles
  return (
    <main className={main}>
      <Header />
      <section className={featuredPostsContainer}>
        {posts.map((post) => (
          <PostCard post={post} key={post.title} />
        ))}
      </section>
      <section className={contentContainer}>
        <section className={postsContainer}>Posts</section>
        <aside className={aside}>
          <RecentPosts />
          <Categories />
        </aside>
      </section>
    </main>
  )
}
