export const revalidate = 60

import { notFound } from 'next/navigation'
import Author from '@/components/BlogPost/Author'
import BlogPost from '@/components/BlogPost/BlogPost'
import { getPostDetails } from '@/services'
import CommentSection from '@/components/commentSection/CommentSection'

type Props = { params: { slug: string } }

export default async function Blog({ params }: Props) {
  const post = await getPostDetails(params.slug)
  if (!post) return notFound()
  return (
    <div>
      <BlogPost post={post} />
      <Author author={post.author} />
      <CommentSection postId={post.id} />
    </div>
  )
}
