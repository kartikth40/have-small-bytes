export const revalidate = 60
import Categories from '@/components/Categories'
import FeaturedPosts from '@/components/Home/FeaturedPosts'
import PageContent from '@/components/Home/PageContent'
import HeroText from '@/components/categories/HeroText'
import { getCategories } from '@/services'
import { notFound } from 'next/navigation'

export default async function Blog({ params }: { params: { cat: string } }) {
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
