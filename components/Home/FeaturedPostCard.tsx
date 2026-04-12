'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from '../../app/page.module.scss'
import ViewCounter from '../BlogPost/ViewCounter'
import moment from 'moment'

type Post = {
  title: string
  summary: string
  slug: string
  updatedAt: string
  featuredImage: { url: string }
  categories: [{ name: string; slug: string }]
  readTime: number
}

const categoryColors: Record<string, string> = {
  'web-development': '#f31559',
  'webdevelopment': '#f31559',
  'web_development': '#f31559',
  'dsa': '#7f43c8',
  'data-structures': '#7f43c8',
  'data-structures-and-algorithms': '#7f43c8',
  'personal-development': '#2f8886',
  'personal_development': '#2f8886',
  'personaldevelopment': '#2f8886',
}

const categoryColorsByName: Record<string, string> = {
  'web development': '#f31559',
  'data structures & algorithms': '#7f43c8',
  'data structures and algorithms': '#7f43c8',
  'dsa': '#7f43c8',
  'personal development': '#2f8886',
}

function CategoryBadge({ name, slug }: { name: string; slug: string }) {
  const color =
    categoryColors[slug.toLowerCase()] ??
    categoryColorsByName[name.toLowerCase()] ??
    '#f31559'
  return (
    <span className={styles.categoryBadge} style={{ '--badge-color': color } as React.CSSProperties}>
      {name}
    </span>
  )
}

export function HeroCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`} className={styles.heroCard}>
      <Image src={post.featuredImage.url} alt={post.title} fill style={{ objectFit: 'cover' }} />
      <div className={styles.heroCardScrim} />
      <div className={styles.heroCardContent}>
        <h2>{post.title}</h2>
        <p>{post.summary.length < 120 ? post.summary : post.summary.slice(0, 120) + '…'}</p>
        <div className={styles.cardMeta}>
          <span>{post.readTime} min read</span>
          <span>·</span>
          <span>{moment(post.updatedAt).format('MMM DD, YYYY')}</span>
          <span>·</span>
          <ViewCounter slug={post.slug} readOnly inline />
        </div>
      </div>
    </Link>
  )
}

export function SideCard({ post }: { post: Post }) {
  const cat = post.categories?.[0]
  return (
    <Link href={`/post/${post.slug}`} className={styles.sideCard}>
      <div className={styles.sideCardThumb}>
        <Image src={post.featuredImage.url} alt={post.title} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className={styles.sideCardContent}>
        {cat && <CategoryBadge name={cat.name} slug={cat.slug} />}
        <h3>{post.title}</h3>
        <div className={styles.cardMeta}>
          <span>{post.readTime} min read</span>
          <span>·</span>
          <span>{moment(post.updatedAt).format('MMM D')}</span>
          <span>·</span>
          <ViewCounter slug={post.slug} readOnly inline />
        </div>
      </div>
    </Link>
  )
}

export default function FeaturedPostCard({ post }: { post: Post }) {
  return <SideCard post={post} />
}
