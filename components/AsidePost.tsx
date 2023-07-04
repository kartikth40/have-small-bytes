import styles from '../app/page.module.scss'
import { getPostDetails, getPostLikes } from '@/services'
import SimilarWidget from './SimilarWidget'
import { notFound } from 'next/navigation'
import LikeButton from './buttons/LikeButton'
import CommentButton from './buttons/CommentButton'

async function Aside({ slug }: { slug: string }) {
  const { aside, like, comment, userFeedbackContainerAside } = styles
  const post = await getPostDetails(slug)
  if (!post) return notFound()
  const likesCount: number = (await getPostLikes(post.id)) || 0

  return (
    <aside className={aside}>
      <SimilarWidget
        slug={post!.slug}
        categories={post!.categories.map((category) => category.slug)}
      />
      <div className={userFeedbackContainerAside}>
        <div className={like}>
          <LikeButton postId={post.id} />
          <span>{likesCount}</span>
        </div>
        <div className={comment}>
          <CommentButton />
          <span>0</span>
        </div>
      </div>
    </aside>
  )
}

export default Aside
