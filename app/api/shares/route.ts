import { incrementPostShares, getPostShares } from '@/services'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  if (!slug) return new Response(JSON.stringify({ shares: 0 }), { status: 400 })

  const shares = await getPostShares(slug)
  return new Response(JSON.stringify({ shares }))
}

export async function POST(request: Request) {
  const { slug } = await request.json()
  if (!slug) return new Response(JSON.stringify({ shares: 0 }), { status: 400 })

  const shares = await incrementPostShares(slug)
  return new Response(JSON.stringify({ shares }))
}
