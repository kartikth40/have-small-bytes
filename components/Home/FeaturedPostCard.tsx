import Link from 'next/link'
import styles from '../../app/page.module.scss'

type Props = { post: { title: string; summary: string; slug: string } }

export default function FeaturedPostCard({ post }: Props) {
  const { featuredPostCard } = styles
  return (
    <Link href={`post/${post.slug}`} className={featuredPostCard}>
      <h3>{post.title}</h3>
      <p>
        {post.summary.length < 150
          ? post.summary
          : post.summary.slice(0, 150) + '.....'}
      </p>
    </Link>
  )
}
