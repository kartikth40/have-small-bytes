export const revalidate = 60
import FeaturedPosts from '@/components/Home/FeaturedPosts'
import PageContent from '@/components/Home/PageContent'
import HeroText from '@/components/categories/HeroText'
import { getCategories } from '@/services'
import { notFound } from 'next/navigation'

import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { cat: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const categories = await getCategories()
  const category = categories.find((cat) => cat.slug === params.cat)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: category?.name ?? 'HSB',
    description:
      'Category based blogs about web development, data structures and algorithms and personal development',
    alternates: {
      canonical: `/category/${params.cat}`,
      languages: {
        en: `/en/category/${params.cat}`,
      },
    },
    openGraph: {
      title: category?.name ?? 'HSB',
      description:
        'Category based blogs about web development, data structures and algorithms and personal development',
      images: [
        {
          url: '/icons/hsb-icon.png',
          width: 400,
          height: 400,
        },
        ...previousImages,
      ],
    },
  }
}

export default async function Blog({ params }: Props) {
  const categories = await getCategories()

  const category = categories.find((cat) => cat.slug === params.cat)
  if (!category) return notFound()
  const categoryName = category.name
  const categorySlug = category.slug

  return (
    <main>
      <HeroText categoryName={categoryName} />
      <FeaturedPosts categorySlug={categorySlug} />
      <PageContent categorySlug={categorySlug} />
    </main>
  )
}
