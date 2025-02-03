'use client'

import styles from '@/app/reader/profile/page.module.scss'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { deleteUser } from '@/services'

type Props = {}

export default function DeleteAccount({}: Props) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const {
    loadingState,
    headingsContainer,
    updateBtnContainer,
    updateForm,
    mainForm,
    dltBtn,
    dltNotAllowed
  } = styles

  if (loading) {
    return <div className={loadingState}>Loading ...</div>
  }
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/reader/profile`)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(session.user.isAuthor) {
      toast.warn('Authors do not have the ability to delete their accounts directly.', {
        toastId: 'do_not_allow_author_acc_deletion',
      })
      return
    }

    let confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmation) return

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
          <label htmlFor="delete">
            Are you sure you want to delete this account?
          </label>
        </section>

        <br />
        <br />

        <div className={updateBtnContainer}>
          <button type="submit" className={`${dltBtn} ${session.user.isAuthor && dltNotAllowed}`}>
            Yes, Delete it.
          </button>
        </div>
      </div>
    </form>
  )
}
