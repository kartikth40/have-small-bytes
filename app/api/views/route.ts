import { incrementPostViews, getPostViews } from '@/services'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  if (!slug) return new Response(JSON.stringify({ views: 0 }), { status: 400 })

  const views = await getPostViews(slug)
  return new Response(JSON.stringify({ views }))
}

export async function POST(request: Request) {
  const { slug } = await request.json()
  if (!slug) return new Response(JSON.stringify({ views: 0 }), { status: 400 })

  const views = await incrementPostViews(slug)
  return new Response(JSON.stringify({ views }))
}
