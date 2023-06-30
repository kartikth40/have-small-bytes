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
import { useRouter, useSearchParams } from 'next/navigation'
import { BuiltInProviderType } from 'next-auth/providers'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'

type Props = {}

export default function LoginPage({}: Props) {
  const { data: session, status: sessionStatus } = useSession()
  const [signingIn, setSigningIn] = useState(false)

  const shouldRedirect = !signingIn && session
  const router = useRouter()

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/')
    }
  }, [router, shouldRedirect])

  // const [providers, setProviders] = useState<Record<
  //   LiteralUnion<BuiltInProviderType, string>,
  //   ClientSafeProvider
  // > | null>(null)
  // useEffect(() => {
  //   async function setP() {
  //     const res = await getProviders()
  //     setProviders(res)
  //   }
  //   setP()
  // }, [])

  const email = useRef('')
  const password = useRef('')
  const {
    headingsContainer,
    mainContainer,
    register,
    loginBtnContainer,
    thirdPartyLoginContainer,
    forgetPass,
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
    const loginId = toast.loading('Checking your credentials...')
    const result = await signIn('credentials', {
      email: email.current,
      password: password.current,
      redirect: false,
    })
    if (result?.error) {
      setSigningIn(false)
      toast.update(loginId, {
        render: 'Wrong Email or Password!...',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
    } else {
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
        {/* <label htmlFor="email">Your Email</label> */}
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

      {/* <div className={thirdPartyLoginContainer}>
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
      </div> */}
    </div>
  )
}
