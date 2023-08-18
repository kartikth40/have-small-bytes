import styles from '../app/page.module.scss'
import { getPostDetails } from '@/services'
import SimilarWidget from './SimilarWidget'
import { notFound } from 'next/navigation'
import LikeButton from './buttons/LikeButton'
import CommentButton from './buttons/CommentButton'

async function Aside({ slug }: { slug: string }) {
  const { aside, userFeedbackContainerAside, postAside } = styles
  const post = await getPostDetails(slug)
  if (!post) return notFound()

  return (
    <aside className={`${aside} ${postAside}`}>
      <SimilarWidget
        slug={post!.slug}
        categories={post!.categories.map((category) => category.slug)}
      />
      <div className={userFeedbackContainerAside}>
        <LikeButton
          postId={post.id}
          postSlug={post.slug}
          postAuthor={post.author.id}
          postTitle={post.title}
        />
        <CommentButton postId={post.id} onPage={true} />
      </div>
    </aside>
  )
}

export default Aside
