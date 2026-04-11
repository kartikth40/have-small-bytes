import styles from '../app/page.module.scss'
import { getPostDetails } from '@/services'
import SimilarWidget from './SimilarWidget'
import SimilarWidgetSkeleton from './SimilarWidgetSkeleton'
import { notFound } from 'next/navigation'
import LikeButton from './buttons/LikeButton'
import CommentButton from './buttons/CommentButton'
import ShareButton from './buttons/ShareButton'
import { Suspense } from 'react'

async function Aside({ slug }: { slug: string }) {
  const { aside, userFeedbackContainerAside, postAside } = styles
  const post = await getPostDetails(slug)
  if (!post) return notFound()

  return (
    <aside className={`${aside} ${postAside}`}>
      <Suspense fallback={<SimilarWidgetSkeleton />}>
        <SimilarWidget
          slug={post!.slug}
          categories={post!.categories.map((category) => category.slug)}
        />
      </Suspense>
      <div className={userFeedbackContainerAside}>
        <LikeButton
          postId={post.id}
          postSlug={post.slug}
          postAuthor={post.author.id}
          postTitle={post.title}
        />
        <CommentButton postId={post.id} onPage={true} />
        <ShareButton slug={post.slug} title={post.title} />
      </div>
    </aside>
  )
}

export default Aside
