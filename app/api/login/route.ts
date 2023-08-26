import { checkLogin, checkLoginWithUsername } from '@/services'
import { signJwtAccessToken } from '@/services/jwt'
import { compare } from 'bcrypt'

interface requestBody {
  email: string
  username: string
  password: string
}

export async function POST(request: Request) {
  const body: requestBody = await request.json()
  let user
  if (body.email) {
    user = await checkLogin(body.email)
  } else if (body.username) {
    user = await checkLoginWithUsername(body.username)
  }

  console.log(user)

  if (user && (await compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user
    const accessToken = signJwtAccessToken(userWithoutPass)
    const result = {
      ...userWithoutPass,
      accessToken,
    }
    return new Response(JSON.stringify(result))
  } else {
    const myOptions = {
      status: 400,
      statusText: 'Incorrect Credentials!',
    }
    return new Response(JSON.stringify(null), myOptions)
  }
}
