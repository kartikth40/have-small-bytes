import styles from '../../app/page.module.scss'

type Props = { post: { title: string; summary: string } }

export default function FeaturedPostCard({ post }: Props) {
  const { featuredPostCard } = styles
  return (
    <div className={featuredPostCard}>
      <div>{post.title}</div>
      <div>{post.summary}</div>
    </div>
  )
}
