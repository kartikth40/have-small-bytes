var nodemailer = require('nodemailer')
//-----------------------------------------------------------------------------
export async function sendMail(subject, toEmail, htmlBody) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
    secure: true,
  })

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    html: htmlBody,
  }

  // send mail
  await transporter.sendMail(mailOptions)
}
