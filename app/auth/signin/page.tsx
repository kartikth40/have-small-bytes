'use client'

import { useRef } from 'react'
import styles from './page.module.scss'

type Props = {}

export default function LoginPage({}: Props) {
  const username = useRef('')
  const password = useRef('')
  const { headingsContainer, mainContainer, register, loginBtnContainer } =
    styles
  return (
    <form action="">
      <div className={headingsContainer}>
        <h3>Sign in</h3>
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
            username.current = e.target.value
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
          <button>Login</button>
        </div>

        <p className={register}>
          Not registered? <a href="#">Register here!</a>
        </p>
      </div>
    </form>
  )
}
