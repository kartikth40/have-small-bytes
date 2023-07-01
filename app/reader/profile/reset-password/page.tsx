'use client'

import React, { useState } from 'react'
import styles from '@/app/reader/profile/page.module.scss'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { resetPassword } from '@/services'

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
      const resetId = toast.loading('resetting password...', {
        position: 'bottom-left',
      })

      const res = await fetch('/api/reset', {
        method: 'POST',
        body: JSON.stringify({ userId: session.user.id, password: newPass }),
        headers: {
          'Content-Type': 'application/json',
          // authorization: `Bearer ${process.env.HYGRAPH_PERMANENTAUTH_TOKEN}`,
        },
      })
      const user = await res.json()
      if (res.ok && user) {
        toast.update(resetId, {
          render: '✅ Password reset successfully!',
          type: 'default',
          isLoading: false,
          autoClose: 3000,
          position: 'bottom-left',
        })
        setNewConfirmPass('')
        setNewPass('')
      } else {
        toast.update(resetId, {
          render: 'Error Ocurred! Please try again later...',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          position: 'bottom-left',
        })
      }
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
            minLength={8}
            maxLength={20}
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
