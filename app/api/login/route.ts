import { checkLogin } from '@/services'
import * as bcrypt from 'bcrypt'

interface requestBody {
  username: string
  password: string
}

export async function POST(request: Request) {
  const body: requestBody = await request.json()

  const user = await checkLogin(body.username)

  if (user && (await bcrypt.compare(user.password, body.password))) {
    const { password, ...userWithoutPassword } = user
    return new Response(JSON.stringify(userWithoutPassword))
  } else {
    new Response(JSON.stringify(null))
  }
}
