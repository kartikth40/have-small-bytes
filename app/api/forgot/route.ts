import { hash } from 'bcrypt'
import { addOTP } from '@/services'
import { sendMail } from '@/services/emailService'

interface requestBody {
  email: string
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
