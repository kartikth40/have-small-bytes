export const revalidate = 60
import Categories from '@/components/Categories'
import FeaturedPosts from '@/components/Home/FeaturedPosts'
import PageContent from '@/components/Home/PageContent'
import HeroText from '@/components/categories/HeroText'
import { getCategories } from '@/services'
import { notFound } from 'next/navigation'

export default async function Blog({ params }: { params: { cat: string } }) {
  const categories = await getCategories()

  const cat = categories.find((cat) => cat.slug === params.cat)?.name
  if (!cat) return notFound()

  return (
    <main>
      <HeroText cat={cat} />
      <FeaturedPosts />
      <PageContent />
    </main>
  )
}
