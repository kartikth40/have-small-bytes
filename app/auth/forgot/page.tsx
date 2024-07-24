'use client'

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './page.module.scss'
import { toast } from 'react-toastify'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { emailValidate, otpValidate } from '@/utils/constants/formValidation'
import { deleteOTP } from '@/services'
import Link from 'next/link'

type Props = {}

function ForgotPasswordPage({}: Props) {
  const { data: session, status: sessionStatus } = useSession()
  const [signingIn, setSigningIn] = useState(false)

  const shouldRedirect = !signingIn && session
  const router = useRouter()

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/reader/profile/reset-password')
      toast('🩹 Please Reset Your Password!', {
        position: 'top-center',
        autoClose: 5000,
        pauseOnHover: true,
      })
    }
  }, [router, shouldRedirect])

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const [otpSent, setOtpSent] = useState(false)
  const [sendingOTP, setSendingOTP] = useState(false)

  const [validEmail, setValidEmail] = useState(false)
  const [invalidEmailMsg, setInvalidEmailMsg] = useState('')
  const [validOtp, setValidOtp] = useState(false)
  const [invalidOtpMsg, setInvalidOtpMsg] = useState('')

  const {
    headingsContainer,
    mainContainer,
    loginBtnContainer,
    userInputsContainer,
    inputContainer,
    validationMark,
    validated,
    invalidate,
    loadingState,
    backButton
  } = styles

  if (shouldRedirect)
    return (
      <div className={loadingState}>
        Redirecting you to reset your password...
      </div>
    )
  if (sessionStatus === 'loading')
    return <div className={loadingState}>Loading ...</div>

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const currentEmail = e.target.value
    setEmail(currentEmail)

    const isEmail = emailValidate(currentEmail)

    if (isEmail.pass) {
      setValidEmail(true)
      setInvalidEmailMsg('')
    } else {
      setValidEmail(false)
      if (isEmail.error) {
        setInvalidEmailMsg('Invalid Email.')
      }
    }
  }

  function handleOtpChange(e: ChangeEvent<HTMLInputElement>) {
    const currentOtp = e.target.value
    setOtp(currentOtp)

    const isOtp = otpValidate(currentOtp)

    if (isOtp.pass) {
      setValidOtp(true)
      setInvalidOtpMsg('')
    } else {
      setValidOtp(false)
      if (isOtp.error) {
        setInvalidOtpMsg(isOtp.error)
      } else {
        setInvalidOtpMsg('Invalid OTP.')
      }
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const isEmail = emailValidate(email)
    const isOTP = otpValidate(otp)

    if (!isEmail.pass) {
      toast.error('Invalid Email.', {
        autoClose: 5000,
        toastId: 'invalid-email',
      })
      return
    }
    if (!isOTP.pass) {
      toast.error('Invalid OTP.', {
        autoClose: 5000,
        toastId: 'invalid-otp',
      })
      return
    }

    const matchId = toast.loading('checking OTP...', {
      position: 'bottom-right',
    })
    setSigningIn(true)
    const res = await signIn('credentials', {
      email: email,
      otp: otp,
      redirect: false,
    })
    if (!res?.error) {
      toast.update(matchId, {
        render: '✅ OTP matched. Signing you in!',
        type: 'default',
        isLoading: false,
        autoClose: 3000,
        position: 'bottom-right',
      })
      setSigningIn(false)
      deleteOTP(email)
    } else {
      toast.update(matchId, {
        render: 'Incorrect OTP...',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        position: 'bottom-right',
      })
      setSigningIn(false)
    }
  }

  async function handleSendOtp() {
    const isEmail = emailValidate(email)
    if (!isEmail.pass) {
      toast.error('Invalid Email.', {
        autoClose: 5000,
        toastId: 'invalid-email',
      })
      return
    }

    setSendingOTP(true)

    const sendId = toast.loading('sending OTP...', {
      position: 'bottom-right',
    })
    const res = await fetch('/api/forgot', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${process.env.HYGRAPH_PERMANENTAUTH_TOKEN}`,
      },
    })

    const user = await res.json()
    if (res.ok && user) {
      toast.update(sendId, {
        render: '✅ OTP sent successfully!',
        type: 'default',
        isLoading: false,
        autoClose: 3000,
        position: 'bottom-right',
      })
      setOtpSent(true)
    } else {
      toast.update(sendId, {
        render: 'Error Ocurred! Please try again later...',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        position: 'bottom-right',
      })
    }
    setSendingOTP(false)
  }

  return (
    <div className={mainContainer}>
      <form onSubmit={(e) => handleSubmit(e)} noValidate={true}>
        <div>
          <Link className={backButton} href="/auth/signin"></Link>
        </div>
        <div className={headingsContainer}>
          <h1>Forgot Password</h1>
        </div>
        {/* Email */}
        <div className={userInputsContainer}>
          <label htmlFor="forgot-email">Email</label>
          <div className={inputContainer}>
            <input
              id="forgot-email"
              type="text"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={(e) => {
                handleEmailChange(e)
              }}
              required
            />
            <span
              data-tooltip={invalidEmailMsg}
              className={`${validationMark} ${validEmail ? validated : ''} ${
                invalidEmailMsg !== '' ? invalidate : ''
              }`}
            ></span>
          </div>

          <label htmlFor="forgot-otp">OTP</label>
          <div className={inputContainer}>
            <input
              id="forgot-otp"
              type="text"
              placeholder="Enter OTP"
              name="otp"
              value={otp}
              onChange={(e) => {
                handleOtpChange(e)
              }}
              readOnly={!otpSent}
              required
            />
            <span
              data-tooltip={invalidOtpMsg}
              className={`${validationMark} ${validOtp ? validated : ''} ${
                invalidOtpMsg !== '' ? invalidate : ''
              }`}
            ></span>
          </div>
        </div>

        <div className={loginBtnContainer}>
          <button
            disabled={otpSent || sendingOTP}
            type="button"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>

          <button disabled={!otpSent} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
