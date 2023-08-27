var nodemailer = require('nodemailer')
//-----------------------------------------------------------------------------
export async function sendMail(subject, toEmail, htmlBody) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
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
