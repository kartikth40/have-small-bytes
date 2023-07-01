'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from '@/app/reader/profile/page.module.scss'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

type Props = {}

export default function ResetPassword({}: Props) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const [newPass, setNewPass] = useState<string>('')
  const [newConfirmPass, setNewConfirmPass] = useState<string>('')

  const {
    loadingState,
    headingsContainer,
    updateBtnContainer,
    updateForm,
    mainForm,
  } = styles

  if (loading) {
    return <div className={loadingState}>Loading ...</div>
  }
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/reader/profile`)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newPass !== newConfirmPass) {
      toast.warning('password and confirm password fields should match!', {
        autoClose: 3000,
        position: 'bottom-left',
      })
    } else {
      // reset password

      toast.success('Password Updated!', {
        autoClose: 3000,
        position: 'bottom-left',
      })
    }
  }
  return (
    <form className={updateForm} onSubmit={(e) => handleSubmit(e)}>
      <div className={headingsContainer}>
        <h3>Reset Password</h3>
      </div>
      <div className={mainForm}>
        <section>
          <label htmlFor="name">New Password</label>
          <input
            type="password"
            placeholder="New Password"
            name="pswd"
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value)
            }}
            required
          />
        </section>

        <br />
        <br />
        <section>
          <label htmlFor="name">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="conpswd"
            value={newConfirmPass}
            onChange={(e) => {
              setNewConfirmPass(e.target.value)
            }}
            required
          />
        </section>
        <br />
        <br />

        <div className={updateBtnContainer}>
          <button type="submit">Reset</button>
        </div>
      </div>
    </form>
  )
}
