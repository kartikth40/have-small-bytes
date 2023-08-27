import { hash } from 'bcrypt'
import { addOTP } from '@/services'
import { sendMail } from '@/services/emailService'

interface requestBody {
  email: string
}

export async function POST(request: Request) {
  const body: requestBody = await request.json()

  let result

  const username = body.email.split('@')[0]

  const subject = 'One Time Password (OTP) for your HSB account'
  const otp = Math.floor(100000 + Math.random() * 900000)
  const mailbody = `
  <div style="width: 100%; font-family: Roboto">
  <h3>Hi ${username},</h3>
  <p>Use <span style="text-decoration:underline">${otp}</span> as One Time Password (OTP) to log in to your HSB account.</p>
  <br>
  <p>Please do not share this OTP with anyone for security reasons.</p>
</div>
  `

  result = await addOTP(body.email, await hash(otp.toString(), 10))
  await sendMail(subject, body.email, mailbody)

  if (result) {
    return new Response(JSON.stringify(result))
  }
  const myOptions = {
    status: 400,
    statusText: 'Error ocurred while sending OTP!',
  }
  return new Response(JSON.stringify(null), myOptions)
}
