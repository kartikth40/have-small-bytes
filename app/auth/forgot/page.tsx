'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import styles from './page.module.scss'
import { toast } from 'react-toastify'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {}

function ForgotPasswordPage({}: Props) {
  const { data: session, status: sessionStatus } = useSession()
  const [signingIn, setSigningIn] = useState(false)

  const shouldRedirect = !signingIn && session
  const router = useRouter()

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/reader/profile/reset-password')
      toast('🩹 Please Reset Your Password ASAP!', {
        position: 'top-center',
        autoClose: 5000,
        pauseOnHover: true,
      })
    }
  }, [router, shouldRedirect])

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const [validEmail, setValidEmail] = useState(false)
  const [invalidEmailMsg, setInvalidEmailMsg] = useState('')

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
  } = styles

  if (shouldRedirect)
    return (
      <div className={loadingState}>
        Redirecting you to reset your password...
      </div>
    )
  if (sessionStatus === 'loading')
    return <div className={loadingState}>Loading ...</div>

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const matchId = toast.loading('checking OTP...', {
      position: 'bottom-right',
    })
    // const res = await fetch('/api/forgot/otp', {
    //   method: 'POST',
    //   body: JSON.stringify({ email: email, otp: otp }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // authorization: `Bearer ${process.env.HYGRAPH_PERMANENTAUTH_TOKEN}`,
    //   },
    // })
    setSigningIn(true)
    const res = await signIn('credentials', {
      email: email,
      otp: otp,
      redirect: false,
    })

    if (res && res.ok) {
      toast.update(matchId, {
        render: '✅ OTP matched successfully!',
        type: 'default',
        isLoading: false,
        autoClose: 3000,
        position: 'bottom-right',
      })
      setSigningIn(false)
      // setNewConfirmPass('')
      // setNewPass('')
    } else {
      toast.update(matchId, {
        render: 'Error Ocurred! Please try again later...',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        position: 'bottom-right',
      })
      setSigningIn(false)
    }
  }

  async function handleSendOtp() {
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
      // setNewConfirmPass('')
      // setNewPass('')
    } else {
      toast.update(sendId, {
        render: 'Error Ocurred! Please try again later...',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        position: 'bottom-right',
      })
    }
  }

  return (
    <div className={mainContainer}>
      <form onSubmit={(e) => handleSubmit(e)} noValidate={true}>
        <div className={headingsContainer}>
          <h3>Forgot Password</h3>
        </div>
        {/* Email */}
        <div className={userInputsContainer}>
          <div className={inputContainer}>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
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

          <div className={inputContainer}>
            {' '}
            {/* Password */}
            <input
              type="text"
              placeholder="Enter OTP"
              name="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value)
              }}
              required
            />
          </div>
        </div>

        <div className={loginBtnContainer}>
          <button type="button" onClick={handleSendOtp}>
            Send OTP
          </button>

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
