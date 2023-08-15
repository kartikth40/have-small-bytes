'use client'

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './page.module.scss'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { checkUserExists } from '@/services'
import { getRandomPhotoId } from '@/utils/constants/profilePicIds'
import {
  emailValidate,
  nameValidate,
  passwordValidate,
  signupValidation,
} from '@/utils/constants/formValidation'

export default function SignUpPage() {
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

  const [validName, setValidName] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [invalidNameMsg, setInvalidNameMsg] = useState('')
  const [invalidEmailMsg, setInvalidEmailMsg] = useState('')
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('')

  const name = useRef('')
  const email = useRef('')
  const password = useRef('')
  const callbackUrl = useSearchParams().get('callbackUrl') ?? '/'

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    name.current = e.target.value

    const validate = nameValidate(e.target.value)
    if (e.target.value.length < (validate.minLength || 3)) return

    if (validate.pass) {
      setValidName(true)
      setInvalidNameMsg('')
    } else {
      setValidName(false)
      if (validate.error) {
        setInvalidNameMsg(validate.error)
      }
    }
  }
  async function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    email.current = e.target.value

    if (e.target.value.length < 3) return

    const validate = emailValidate(e.target.value)
    const emailAlreadyExists = await checkUserExists(e.target.value)
    if (validate.pass && !emailAlreadyExists) {
      setValidEmail(true)
      setInvalidEmailMsg('')
    } else {
      setValidEmail(false)
      if (validate.error) {
        setInvalidEmailMsg(validate.error)
      } else if (emailAlreadyExists) {
        setInvalidEmailMsg('Email already exists.')
      }
    }
  }
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    password.current = e.target.value

    const validate = passwordValidate(e.target.value)
    if (e.target.value.length < (validate.minLength || 8)) return
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
    loginBtnContainer,
    login,
    loadingState,
    inputContainer,
    userInputsContainer,
    validationMark,
    validated,
    invalidate,
  } = styles

  if (shouldRedirect)
    return <div className={loadingState}>Redirecting to home page...</div>
  if (sessionStatus === 'loading')
    return <div className={loadingState}>Loading ...</div>

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const credentials = {
      name: name.current,
      email: email.current,
      password: password.current,
      photoId: getRandomPhotoId(),
    }

    const validateResponse = signupValidation(
      credentials.name,
      credentials.email,
      credentials.password
    )

    if (!validateResponse.pass) {
      toast.warning(validateResponse.error, { autoClose: 5000 })
      return
    }

    setSigningIn(true)
    // check for existing email
    const createId = toast.loading('Checking Email...')
    const checkUser = await checkUserExists(email.current)
    if (checkUser) {
      toast.update(createId, {
        render: 'Email already exists!',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
      setSigningIn(false)
    }
    // create new account
    else {
      toast.update(createId, {
        render: 'Creating your account...',
        isLoading: true,
        autoClose: 3000,
      })
      const res = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
          // authorization: `Bearer ${process.env.HYGRAPH_PERMANENTAUTH_TOKEN}`,
        },
      })
      const user = await res.json()
      if (res.ok && user) {
        toast.update(createId, {
          render: '🎀 Account Created!',
          type: 'default',
          isLoading: false,
          autoClose: 3000,
        })
        // login to new account created
        const loginId = toast.loading('Logging you in, please wait...')
        await signIn('credentials', {
          email: email.current,
          password: password.current,
          redirect: false,
        })
        toast.update(loginId, {
          render: '🦄 Logged In!',
          type: 'default',
          isLoading: false,
          autoClose: 3000,
        })
        router.push(callbackUrl ?? '/')
      }
      // handle any errors
      else {
        setSigningIn(false)
        toast.update(createId, {
          render: res.statusText,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        })
      }
    }
  }
  return (
    <>
      <div className={mainContainer}>
        <form onSubmit={(e) => handleSubmit(e)} noValidate={true}>
          <div className={headingsContainer}>
            <h3>Sign Up</h3>
          </div>
          {/* Name */}
          <div className={userInputsContainer}>
            <div className={inputContainer}>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={(e) => {
                  handleNameChange(e)
                }}
                required
              />
              <span
                data-tooltip={invalidNameMsg}
                className={`${validationMark} ${validName ? validated : ''} ${
                  invalidNameMsg !== '' ? invalidate : ''
                }`}
              ></span>
            </div>
            {/* Email */}
            <div className={inputContainer}>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={async (e) => {
                  await handleEmailChange(e)
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

            {/* Password */}
            <div className={inputContainer}>
              <input
                type="password"
                placeholder="Enter Password"
                name="pswrd"
                onChange={(e) => {
                  handlePasswordChange(e)
                }}
                required
              />
              <span
                data-tooltip={invalidPasswordMsg}
                className={`${validationMark} ${
                  validPassword ? validated : ''
                } ${invalidPasswordMsg !== '' ? invalidate : ''}`}
              ></span>
            </div>
          </div>

          <div className={loginBtnContainer}>
            <button type="submit" disabled={signingIn}>
              Create Account
            </button>
          </div>
          <p className={login}>
            Already have an account?{' '}
            <Link href={`/auth/signin?callbackUrl=${callbackUrl}`}>Login</Link>
          </p>
        </form>
      </div>
    </>
  )
}
