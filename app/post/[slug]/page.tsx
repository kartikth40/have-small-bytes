import styles from './page.module.scss'

import Author from '@/components/BlogPost/Author'
import BlogPost from '@/components/BlogPost/BlogPost'

type Props = { params: { slug: string } }

export default function Blog({ params }: Props) {
  const { blogPostContainer } = styles
  return (
    <div>
      <BlogPost slug={params.slug} />
      <Author />
    </div>
  )
}
