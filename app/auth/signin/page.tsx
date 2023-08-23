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
  usernameValidate,
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

  const [validEmailOrUsername, setValidEmailOrUsername] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [invalidEmailOrUsernameMsg, setInvalidEmailOrUsernameMsg] = useState('')
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('')

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

  function handleEmailOrUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    emailOrUsername.current = e.target.value

    const isEmail = emailValidate(emailOrUsername.current)
    const isUsername = usernameValidate(emailOrUsername.current)

    if (e.target.value.length < (isUsername.minLength || 4)) {
      setValidEmailOrUsername(false)
      setInvalidEmailOrUsernameMsg('')
      return
    }
    if (isEmail.pass || isUsername.pass) {
      setValidEmailOrUsername(true)
      setInvalidEmailOrUsernameMsg('')
    } else {
      setValidEmailOrUsername(false)
      if (isUsername.error && isEmail.error) {
        setInvalidEmailOrUsernameMsg('Invalid Username or Email.')
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

  const emailOrUsername = useRef('')
  const password = useRef('')
  const callbackUrl = useSearchParams().get('callbackUrl') ?? '/'

  if (shouldRedirect)
    return <div className={loadingState}>Redirecting to home page...</div>
  if (sessionStatus === 'loading')
    return <div className={loadingState}>Loading ...</div>

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const isEmail = emailValidate(emailOrUsername.current)
    const isUsername = usernameValidate(emailOrUsername.current)

    console.log(isEmail, isUsername)

    if (!isEmail.pass && !isUsername.pass) {
      toast.error('Invalid Email or Username.', {
        autoClose: 5000,
        toastId: 'invalid-email-username',
      })
      toast.warning(isUsername.error, {
        autoClose: 5000,
        toastId: 'invalid-username',
      })
      return
    }

    setSigningIn(true)
    // Match Credentials
    const loginId = toast.loading('Checking your credentials...')
    const result = await signIn('credentials', {
      email: isEmail ? emailOrUsername.current : '',
      username: isUsername ? emailOrUsername.current : '',
      password: password.current,
      redirect: false,
    })
    console.log(result)
    console.log(isEmail ? emailOrUsername.current : '')
    console.log(isUsername ? emailOrUsername.current : '')
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
              type="text"
              placeholder="Enter Email or Username"
              name="emailOrUsername"
              onChange={(e) => {
                handleEmailOrUsernameChange(e)
              }}
              required
            />
            <span
              data-tooltip={invalidEmailOrUsernameMsg}
              className={`${validationMark} ${
                validEmailOrUsername ? validated : ''
              } ${invalidEmailOrUsernameMsg !== '' ? invalidate : ''}`}
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
