import { getPosts, getPostsCount } from '@/services'

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  priority?: number
}>

export default async function sitemap(): Promise<Sitemap> {
  const baseURL = 'https://havesmallbytes.vercel.app'
  const posts = []

  const count = await getPostsCount()

  for (let i = 0; i <= count; i += 3) {
    const newPosts = await getPosts(i)
    const p = newPosts.map((post) => ({
      slug: post.slug,
      updatedAt: post.updatedAt,
    }))
    if (p.length) posts.push(...p)
  }

  const postUrls = posts?.map((post) => ({
    url: `${baseURL}/post/${post.slug}`,
    lastModified: post.updatedAt,
    priority: 0.8,
  }))

  return [
    {
      url: baseURL,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseURL}/category/webdev`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseURL}/category/dsa`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseURL}/category/personal-development`,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...postUrls,
  ]
}
