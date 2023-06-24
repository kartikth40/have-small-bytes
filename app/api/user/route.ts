import { addUser } from '@/services'
import * as bcrypt from 'bcrypt'

interface requestBody {
  username: string
  password: string
}

export async function POST(request: Request) {
  const body: requestBody = await request.json()
  const user = await addUser(
    body.username,
    await bcrypt.hash(body.password, 10)
  )
  if (user) {
    return new Response(JSON.stringify(user))
  }
  const myOptions = { status: 400, statusText: 'Username Already Exists!' }
  return new Response(JSON.stringify(null), myOptions)
}
