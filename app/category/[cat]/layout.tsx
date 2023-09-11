import { getCategories } from '@/services'
import styles from './page.module.scss'

import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { cat: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const categories = await getCategories()
  const category = categories.find((cat) => cat.slug === params.cat)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: category?.name,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pageLayout } = styles
  return (
    <main>
      <div className={pageLayout}>{children}</div>
    </main>
  )
}
