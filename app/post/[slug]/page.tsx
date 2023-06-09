import styles from './page.module.scss'

import Author from '@/components/BlogPost/Author'
import BlogPost from '@/components/BlogPost/BlogPost'
import Comments from '@/components/BlogPost/Comments'

type Props = { params: { slug: string } }

export default function Blog({ params }: Props) {
  const { blogPostContainer } = styles
  return (
    <div>
      <BlogPost slug={params.slug} />
      <Author />
      <Comments />
    </div>
  )
}
