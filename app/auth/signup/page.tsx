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
import { redirect, useRouter } from 'next/navigation'
import { BuiltInProviderType } from 'next-auth/providers'
import Image from 'next/image'
import { toast } from 'react-toastify'

type Props = {}

export default function SignUpPage({}: Props) {
  const { data: session } = useSession()
  if (session) {
    redirect('/')
  }

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

  const username = useRef('')
  const password = useRef('')
  const {
    headingsContainer,
    mainContainer,
    loginBtnContainer,
    thirdPartyLoginContainer,
  } = styles
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const credentials = {
      username: username.current,
      password: password.current,
    }
    const createId = toast.loading('Creating your account...')
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
        username: username.current,
        password: password.current,
      })
      toast.update(loginId, {
        render: '🦄 Logged In',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      router.push('/')
    } else {
      console.log(user, res)
      toast.update(createId, {
        render: res.statusText,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={mainContainer}>
          <div className={headingsContainer}>
            <h3>Sign Up</h3>
          </div>
          {/* <label htmlFor="username">Your username</label> */}
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={(e) => {
              username.current = e.target.value
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
      </form>
    </>
  )
}
