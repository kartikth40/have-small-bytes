'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import styles from './page.module.scss'
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  useSession,
} from 'next-auth/react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { BuiltInProviderType } from 'next-auth/providers'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { checkUserExists } from '@/services'
import Link from 'next/link'
import { getRandomPhotoId } from '@/utils/constants/profilePicIds'

type Props = {}

export default function SignUpPage({}: Props) {
  const { data: session, status: sessionStatus } = useSession()
  const [signingIn, setSigningIn] = useState(false)

  const shouldRedirect = !signingIn && session
  const router = useRouter()

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/')
    }
  }, [router, shouldRedirect])

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null)
  useEffect(() => {
    async function setP() {
      const res = await getProviders()
      setProviders(res)
    }
    setP()
  }, [])

  const name = useRef('')
  const email = useRef('')
  const password = useRef('')
  const {
    headingsContainer,
    mainContainer,
    loginBtnContainer,
    thirdPartyLoginContainer,
    login,
    loadingState,
  } = styles
  const callbackUrl = useSearchParams().get('callbackUrl')
  if (shouldRedirect)
    return <div className={loadingState}>Redirecting to home page...</div>
  if (sessionStatus === 'loading')
    return <div className={loadingState}>Loading ...</div>
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSigningIn(true)

    const credentials = {
      name: name.current,
      email: email.current,
      password: password.current,
      photoId: getRandomPhotoId(),
    }
    const createId = toast.loading('Checking Email...')
    const checkUser = await checkUserExists(email.current)
    if (checkUser && checkUser.id) {
      toast.update(createId, {
        render: 'Email already exists!',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    } else {
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
          render: '🦄 Account Created!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
        const loginId = toast.loading('Logging you in, please wait...')

        await signIn('credentials', {
          email: email.current,
          password: password.current,
          redirect: false,
        })
        toast.update(loginId, {
          render: '🦄 Logged In!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
        router.push(callbackUrl ?? '/')
      } else {
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={headingsContainer}>
            <h3>Sign Up</h3>
          </div>
          {/* <label htmlFor="name">Your Name</label> */}
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            onChange={(e) => {
              name.current = e.target.value
            }}
            required
          />

          <br />
          <br />
          {/* <label htmlFor="email">Your Email</label> */}
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={(e) => {
              email.current = e.target.value
            }}
            required
          />

          <br />
          <br />

          {/* <label htmlFor="pswrd">Your password</label> */}
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
          <div className={loginBtnContainer}>
            <button type="submit">Create Account</button>
          </div>
          <p className={login}>
            Already have an account?{' '}
            <Link href={`/auth/signin?callbackUrl=${callbackUrl}`}>Login</Link>
          </p>
        </form>
        <div className={thirdPartyLoginContainer}>
          {providers
            ? Object.values(providers).map((provider) =>
                provider.name !== 'Credentials' ? (
                  <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>
                      <Image
                        src={`https://authjs.dev/img/providers/${provider.id}-dark.svg`}
                        width={24}
                        height={24}
                        alt={`${provider.name} logo`}
                      />
                      Continue with {provider.name}
                    </button>
                  </div>
                ) : null
              )
            : null}
        </div>
      </div>
    </>
  )
}
