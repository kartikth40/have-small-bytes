'use client'

import { FormEvent, useRef } from 'react'
import styles from './page.module.scss'
import { getSession, signIn } from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'

type Props = {}

export default async function LoginPage({}: Props) {
  const session = await getSession()

  if (session && session.user) {
    redirect('/reader/profile')
  }
  const username = useRef('')
  const password = useRef('')
  const { headingsContainer, mainContainer, register, loginBtnContainer } =
    styles
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
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={headingsContainer}>
        {/* <h3>Sign in</h3> */}
        <p>Sign in with your username and password</p>
      </div>

      <div className={mainContainer}>
        <label htmlFor="username">Your username</label>
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

        <label htmlFor="pswrd">Your password</label>
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
          Not registered? <a href="#">Register here!</a>
        </p>
      </div>
    </form>
  )
}
