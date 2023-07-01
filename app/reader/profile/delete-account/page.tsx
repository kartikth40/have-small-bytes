'use client'

import styles from '@/app/reader/profile/page.module.scss'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { deleteUser } from '@/services'

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
    dltBtn,
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
    const deleteId = toast.loading('deleting account...')

    const result = await deleteUser(session.user.id)
    if (result) {
      toast.update(deleteId, {
        render: 'Account Deleted! Logging you out...',
        type: 'info',
        isLoading: false,
        autoClose: 5000,
      })
      signOut({ callbackUrl: '/' })
    } else {
      toast.update(deleteId, {
        render: 'Error Ocurred! Please try again later...',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
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
          <button type="submit" className={dltBtn}>
            Yes, Delete it.
          </button>
        </div>
      </div>
    </form>
  )
}
