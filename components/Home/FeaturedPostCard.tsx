import styles from '../../app/page.module.scss'

type Props = { post: { title: string; summary: string } }

export default function FeaturedPostCard({ post }: Props) {
  const { featuredPostCard } = styles
  return (
    <div className={featuredPostCard}>
      <h3>{post.title}</h3>
      <p>
        {post.summary.length < 150
          ? post.summary
          : post.summary.slice(0, 150) + '.....'}
      </p>
    </div>
  )
}
