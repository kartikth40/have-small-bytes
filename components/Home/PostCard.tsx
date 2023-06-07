import styles from '../../app/page.module.scss'

type Props = { post: { title: string; summary: string } }

function PostCard({ post }: Props) {
  const { featuredPost } = styles
  return (
    <div className={featuredPost}>
      <div>{post.title}</div>
      <div>{post.summary}</div>
    </div>
  )
}

export default PostCard
