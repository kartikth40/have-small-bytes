import { resetPassword } from '@/services'
import { hash } from 'bcrypt'

interface requestBody {
  userId: string
  password: string
}

export async function POST(request: Request) {
  const body: requestBody = await request.json()
  const user = await resetPassword(body.userId, await hash(body.password, 10))

  if (user) {
    return new Response(JSON.stringify(user))
  }
  const myOptions = {
    status: 400,
    statusText: 'Error ocurred while resetting the password!',
  }
  return new Response(JSON.stringify(null), myOptions)
}
