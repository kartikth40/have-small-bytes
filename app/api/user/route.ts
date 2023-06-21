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

  return new Response(JSON.stringify(user))
}
