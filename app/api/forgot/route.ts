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
<div style="width: 100%; font-family: Roboto, sans-serif; line-height: 1.6; color: #333;">
  <h3 style="color: #2c3e50; margin: 10px;">Hello ${username},</h3>
  <p style="margin: 10px;">We received a request to log in to your HSB account. Please use the One-Time Password (OTP) below to proceed:</p>
  <p style="font-size: 2.5em; font-weight: bold; color: #4346ff; background: #e1e2ff; padding: 10px; border: 2px solid #7476ff; border-radius: 5px; display: block; text-align: center; margin: 10px 20px">${otp}</p>
  <p style="margin: 10px;">For your security, please do not share this OTP with anyone.</p>
  <br>
  <p style="margin: 0px 10px">Thank you,</p>
  <p style="margin: 0px 10px">Kartik Thakur</p>
  <p style="margin: 0px 10px">HSB</p>
  <br>
  <p style="font-size: 0.9em; color: #888;">You can reply to this email or contact me directly at kartikthakur.2409@gmail.com if you need any help.</p>
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
