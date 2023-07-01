'use client'

import styles from '@/app/reader/profile/page.module.scss'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

type Props = {}

export default function ResetPassword({}: Props) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

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

    // delete account

    toast.success('Account Deleted!', {
      autoClose: 3000,
      position: 'bottom-left',
    })
  }
  return (
    <form className={updateForm} onSubmit={(e) => handleSubmit(e)}>
      <div className={headingsContainer}>
        <h3>Delete Account</h3>
      </div>
      <div className={mainForm}>
        <section>
          <label htmlFor="name">
            Are you sure you want to delete this account?
          </label>
        </section>

        <br />
        <br />

        <div className={updateBtnContainer}>
          <button type="submit">Yes, Delete it.</button>
        </div>
      </div>
    </form>
  )
}
