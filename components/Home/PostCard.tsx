import { post } from '@/services'
import styles from '../../app/page.module.scss'

type Props = { post: post }

function PostCard({ post }: Props) {
  const { postCard } = styles
  return (
    <div className={postCard}>
      <div>{post.title}</div>
      <div>{post.summary}</div>
      <div>{post.author.name}</div>
    </div>
  )
}

export default PostCard
