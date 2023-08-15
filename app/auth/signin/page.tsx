'use client'

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './page.module.scss'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import {
  emailValidate,
  passwordValidate,
  signinValidation,
} from '@/utils/constants/formValidation'

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

  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [invalidEmailMsg, setInvalidEmailMsg] = useState('')
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('')

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    email.current = e.target.value

    if (e.target.value.length < 3) {
      setValidEmail(false)
      setInvalidEmailMsg('')
      return
    }

    const validate = emailValidate(e.target.value)
    console.log(validate, e.target.value)
    if (validate.pass) {
      setValidEmail(true)
      setInvalidEmailMsg('')
    } else {
      setValidEmail(false)
      if (validate.error) {
        setInvalidEmailMsg(validate.error)
      }
    }
  }
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    password.current = e.target.value

    const validate = passwordValidate(e.target.value)

    if (e.target.value.length < (validate.minLength || 8)) {
      setValidPassword(false)
      setInvalidPasswordMsg('')
      return
    }
    if (validate.pass) {
      setValidPassword(true)
      setInvalidPasswordMsg('')
    } else {
      setValidPassword(false)
      if (validate.error) {
        setInvalidPasswordMsg(validate.error)
      }
    }
  }

  const {
    headingsContainer,
    mainContainer,
    register,
    loginBtnContainer,
    forgetPass,
    loadingState,
    userInputsContainer,
    inputContainer,
    validationMark,
    validated,
    invalidate,
  } = styles

  const email = useRef('')
  const password = useRef('')
  const callbackUrl = useSearchParams().get('callbackUrl') ?? '/'

  if (shouldRedirect)
    return <div className={loadingState}>Redirecting to home page...</div>
  if (sessionStatus === 'loading')
    return <div className={loadingState}>Loading ...</div>

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const validateResponse = signinValidation(email.current, password.current)

    if (!validateResponse.pass) {
      toast.warning(validateResponse.error, { autoClose: 5000 })
      return
    }

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
        type: 'default',
        isLoading: false,
        autoClose: 3000,
      })
      router.push(callbackUrl ?? '/')
    }
  }
  return (
    <div className={mainContainer}>
      <form onSubmit={(e) => handleSubmit(e)} noValidate={true}>
        <div className={headingsContainer}>
          <h3>Welcome Back</h3>
        </div>
        {/* Email */}
        <div className={userInputsContainer}>
          <div className={inputContainer}>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
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
          <div className={inputContainer}>
            {' '}
            {/* Password */}
            <input
              type="password"
              placeholder="Enter Password"
              name="pswrd"
              onChange={(e) => {
                handlePasswordChange(e)
              }}
              required
            />{' '}
            <span
              data-tooltip={invalidPasswordMsg}
              className={`${validationMark} ${validPassword ? validated : ''} ${
                invalidPasswordMsg !== '' ? invalidate : ''
              }`}
            ></span>
          </div>
        </div>

        <div className={loginBtnContainer}>
          <button type="submit" disabled={signingIn}>
            Login
          </button>
        </div>
        {/* <div>
          <p className={forgetPass}>
            <a href="#">Forgot Password?</a>
          </p>
        </div> */}
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
