'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './page.module.scss'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const { data: session, status: sessionStatus } = useSession()
  const [signingIn, setSigningIn] = useState(false)

  // should redirect if not sigining in and also session is not there
  const shouldRedirect = !signingIn && session
  const router = useRouter()

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/')
    }
  }, [router, shouldRedirect])

  const {
    headingsContainer,
    mainContainer,
    register,
    loginBtnContainer,
    forgetPass,
    loadingState,
  } = styles

  const email = useRef('')
  const password = useRef('')
  const callbackUrl = useSearchParams().get('callbackUrl')

  if (shouldRedirect)
    return <div className={loadingState}>Redirecting to home page...</div>
  if (sessionStatus === 'loading')
    return <div className={loadingState}>Loading ...</div>

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSigningIn(true)
    // Match Credentials
    const loginId = toast.loading('Checking your credentials...')
    const result = await signIn('credentials', {
      email: email.current,
      password: password.current,
      redirect: false,
    })
    // handle error
    if (result?.error) {
      setSigningIn(false)
      toast.update(loginId, {
        render: 'Wrong Email or Password!...',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
    }
    // logged in - push to callbackUrl
    else {
      toast.update(loginId, {
        render: '🦄 Logged In!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      router.push(callbackUrl ?? '/')
    }
  }
  return (
    <div className={mainContainer}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={headingsContainer}>
          <h3>Welcome Back</h3>
        </div>
        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={(e) => {
            email.current = e.target.value
          }}
          required
        />

        <br />
        <br />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          name="pswrd"
          onChange={(e) => {
            password.current = e.target.value
          }}
          required
        />
        <br />
        <br />
        <br />
        <div className={loginBtnContainer}>
          <button type="submit">Login</button>
        </div>
        <div>
          <p className={forgetPass}>
            <a href="#">Forgot Password?</a>
          </p>
        </div>
        <p className={register}>
          Not registered?{' '}
          <Link href={`/auth/signup?callbackUrl=${callbackUrl}`}>
            Register here!
          </Link>
        </p>
      </form>
    </div>
  )
}
