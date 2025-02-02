import Link from 'next/link'
import styles from '../../app/page.module.scss'
import Image from 'next/image';

type Props = { post: { title: string; summary: string; slug: string, featuredImage: {url: string} } }

export default function FeaturedPostCard({ post }: Props) {
  const { featuredPostCard,featuredPostCardImageContainer } = styles
  return (
    <Link href={`post/${post.slug}`} className={featuredPostCard}>
      <div className={featuredPostCardImageContainer}>
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          style={{ objectFit: 'cover' }}
          fill
        />
      </div>
      <h3>{post.title}</h3>
      <p>
        {post.summary.length < 150
          ? post.summary
          : post.summary.slice(0, 150) + '...'}
      </p>
    </Link>
  )
}
