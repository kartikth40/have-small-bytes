export const revalidate = 60
import Author from '@/components/BlogPost/Author'
import BlogPost from '@/components/BlogPost/BlogPost'
import { getPosts } from '@/services'

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

type Props = { params: { slug: string } }

export default function Blog({ params }: Props) {
  return (
    <div>
      <BlogPost slug={params.slug} />
      <Author />
    </div>
  )
}
