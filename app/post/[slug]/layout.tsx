import styles from './page.module.scss'
import Aside from '@/components/AsidePost'
import { getPostBySlug, getPosts } from '@/services'

import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const post = await getPostBySlug(params.slug)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post?.title ?? 'HSB',
    description: post?.summary,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const { contentContainer, postContainer } = styles
  return (
    <main className={contentContainer}>
      <div className={postContainer}>{children}</div>
      <Aside slug={params.slug} />
    </main>
  )
}
