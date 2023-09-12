export const revalidate = 60

import { notFound } from 'next/navigation'
import Author from '@/components/BlogPost/Author'
import BlogPost from '@/components/BlogPost/BlogPost'
import { getPostDetails } from '@/services'
import CommentSection from '@/components/commentSection/CommentSection'
import { getPostBySlug } from '@/services'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = { params: { slug: string } }

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const post = await getPostBySlug(params.slug)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post?.title ?? 'HSB',
    description: post?.summary,
    alternates: {
      canonical: `/post/${params.slug}`,
      languages: {
        en: `/en/post/${params.slug}`,
      },
    },
    openGraph: {
      title: post?.title ?? 'HSB',
      description: post?.summary,
      images: [
        {
          url: post?.featuredImage.url!,
          width: 400,
          height: 400,
        },
        ...previousImages,
      ],
    },
  }
}

export default async function Blog({ params }: Props) {
  const post = await getPostDetails(params.slug)
  if (!post) return notFound()
  return (
    <div>
      <BlogPost post={post} />
      <Author author={post.author} />
      <CommentSection
        postId={post.id}
        postSlug={post.slug}
        postAuthor={post.author.id}
        postTitle={post.title}
      />
    </div>
  )
}
