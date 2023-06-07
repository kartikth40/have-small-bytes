import styles from '../app/page.module.scss'
import PostCard from './PostCard'

const posts = [
  { title: 'React Testing', summary: 'Learn React Testing' },
  { title: 'React Tailwind', summary: 'Learn React with Tailwind' },
]

type Props = {}

function FeaturedPosts({}: Props) {
  const { featuredPostsContainer } = styles

  return (
    <section className={featuredPostsContainer}>
      {posts.map((post) => (
        <PostCard post={post} key={post.title}></PostCard>
      ))}
    </section>
  )
}

export default FeaturedPosts
