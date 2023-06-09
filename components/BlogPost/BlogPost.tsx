import { getPostDetails } from '@/services'
import styles from '../../app/post/[slug]/page.module.scss'

export default async function BlogPost({ slug }: { slug: string }) {
  const { blogPostContainer } = styles
  const post = await getPostDetails(slug)
  return <div className={blogPostContainer}>{JSON.stringify(post)}</div>
}
