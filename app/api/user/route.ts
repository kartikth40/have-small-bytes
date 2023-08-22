import { addUser } from '@/services'
import * as bcrypt from 'bcrypt'

interface requestBody {
  username: string
  email: string
  password: string
  photoId: string
}

export async function POST(request: Request) {
  const body: requestBody = await request.json()
  const user = await addUser(
    body.username,
    body.email,
    await bcrypt.hash(body.password, 10),
    body.photoId
  )

  if (user) {
    return new Response(JSON.stringify(user))
  }
  const myOptions = { status: 400, statusText: 'Email Already Exists!' }
  return new Response(JSON.stringify(null), myOptions)
}
