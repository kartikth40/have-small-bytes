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
import { redirect, useSearchParams } from 'next/navigation'
import { BuiltInProviderType } from 'next-auth/providers'
import Link from 'next/link'

type Props = {}

export default function LoginPage({}: Props) {
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
    register,
    loginBtnContainer,
    thirdPartyLoginContainer,
  } = styles
  const callbakUrl = useSearchParams().get('callbackUrl')
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const result = await signIn('credentials', {
      username: username.current,
      password: password.current,
      redirect: true,
      callbackUrl: `${callbakUrl}`,
    })
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={headingsContainer}>
          {/* <h3>Sign in</h3> */}
          <p>Sign in with your username and password</p>
        </div>

        <div className={mainContainer}>
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
          <div>
            <p>
              <a href="#">Forgot Password?</a>
            </p>
          </div>
          <br />
          <div className={loginBtnContainer}>
            <button type="submit">Sign in</button>
          </div>

          <p className={register}>
            Not registered? <Link href="/auth/signup">Register here!</Link>
          </p>

          <div className={thirdPartyLoginContainer}>
            {providers
              ? Object.values(providers).map((provider) =>
                  provider.name !== 'Credentials' ? (
                    <div key={provider.name}>
                      <button onClick={() => signIn(provider.id)}>
                        <img
                          loading="lazy"
                          id="provider-logo-dark"
                          src={`https://authjs.dev/img/providers/${provider.id}-dark.svg`}
                          width="24"
                          height="24"
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
