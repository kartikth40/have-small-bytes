import { compare, hash } from 'bcrypt'
import { addOTP, getOTP } from '@/services'
import { sendMail } from '@/services/emailService'

interface requestBody {
  email: string
}
interface userRequestBody {
  email: string
  otp: number
}

export async function POST(request: Request) {
  const body: requestBody = await request.json()

  let result

  const subject = 'Have Small Bytes'
  const otp = Math.floor(100000 + Math.random() * 900000)
  const mailbody = `
    <h1>Your OTP</h1>
    ---  ${otp}  ---
  `

  result = await addOTP(body.email, await hash(otp.toString(), 10))
  sendMail(subject, body.email, mailbody)

  if (result) {
    return new Response(JSON.stringify(result))
  }
  const myOptions = {
    status: 400,
    statusText: 'Error ocurred while sending OTP!',
  }
  return new Response(JSON.stringify(null), myOptions)
}

export async function GET(request: Request) {
  const body: userRequestBody = await request.json()
  const user = await getOTP(body.email)

  console.log(user)

  if (user && (await compare(body.otp.toString(), user.otp!))) {
    return new Response(JSON.stringify(user.id))
  } else {
    const myOptions = {
      status: 400,
      statusText: 'Incorrect OTP!',
    }
    return new Response(JSON.stringify(null), myOptions)
  }
}
