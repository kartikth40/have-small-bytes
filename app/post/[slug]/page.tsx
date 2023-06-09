import BlogPost from '@/components/BlogPost/BlogPost'

type Props = { params: { slug: string } }

export default function Blog({ params }: Props) {
  return <BlogPost />
}
