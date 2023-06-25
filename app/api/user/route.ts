import { addUser } from '@/services'
import * as bcrypt from 'bcrypt'

interface requestBody {
  name: string
  email: string
  password: string
}

export async function POST(request: Request) {
  const body: requestBody = await request.json()
  const user = await addUser(
    body.name,
    body.email,
    await bcrypt.hash(body.password, 10)
  )

  if (user) {
    return new Response(JSON.stringify(user))
  }
  const myOptions = { status: 400, statusText: 'Email Already Exists!' }
  return new Response(JSON.stringify(null), myOptions)
}
