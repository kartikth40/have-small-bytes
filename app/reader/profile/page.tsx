'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from '@/app/reader/profile/page.module.scss'
import ProfilePicModal from '@/components/modals/ProfilePicModal'
import { getAvatarById, updateUser } from '@/services'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

type Props = {}

export default function ProfileUpdate({}: Props) {
  const { data: session, status, update } = useSession()
  const loading = status === 'loading'

  const [newAvatarId, setNewAvatarId] = useState<string>('')
  const [name, setName] = useState<string>('')
  const email = useRef('')
  const [avatarUrl, setAvatarUrl] = useState<string>('')

  useEffect(() => {
    if (!loading) {
      const user = session?.user
      setName(user ? user.name : '')
      email.current = user ? user.email : ''
      setAvatarUrl(user && user.photo ? user.photo?.url : '')
    }
  }, [loading, session?.user])
  const {
    headingsContainer,
    updateBtnContainer,
    updateForm,
    mainForm,
    profileUpdationForm,
    profilePicContainer,
    formStatus,
    disable,
    profilePicSection,
    loadingState,
  } = styles

  if (loading) {
    return <div className={loadingState}>Loading ...</div>
  }
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/reader/profile`)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newId = newAvatarId !== '' ? newAvatarId : session.user.photo?.id
    const newUrl = await getAvatarById(newId!)

    // update user
    const updateId = toast.loading('updating profile...', {
      position: 'bottom-left',
    })
    const result = await updateUser(session.user.id, name, newId!)
    if (result) {
      await update({
        ...session,
        user: {
          ...session.user,
          name: name,
          photo: {
            id: newId,
            url: newUrl,
          },
        },
      })
      toast.update(updateId, {
        render: 'Profile Updated!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        position: 'bottom-left',
      })
    } else {
      toast.update(updateId, {
        render: 'Error Ocurred! Please try again later...',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        position: 'bottom-left',
      })
    }
  }

  const handleReset = () => {
    if (name !== session.user.name) {
      setName(session.user.name)
    }
    if (newAvatarId !== session.user.photo?.id && newAvatarId !== '') {
      setNewAvatarId('')
    }
  }
  return (
    <form
      className={updateForm}
      onSubmit={(e) => handleSubmit(e)}
      onReset={handleReset}
    >
      <div className={headingsContainer}>
        <h3>Update Profile</h3>
        <span
          className={`${formStatus} ${
            name === session.user.name &&
            (newAvatarId === session.user.photo?.id || newAvatarId === '') &&
            disable
          }`}
        >
          (unsaved changes)*
        </span>
      </div>
      <div className={`${mainForm} ${profileUpdationForm}`}>
        <section className={profilePicSection}>
          <label htmlFor="pic">Profile Pic</label>
          <div className={profilePicContainer}>
            <ProfilePicModal
              setNewAvatarId={setNewAvatarId}
              loading={loading}
              src={avatarUrl}
              alt={name}
            />
            <span
              className={`${formStatus} ${
                (newAvatarId === session.user.photo?.id ||
                  newAvatarId === '') &&
                disable
              }`}
            >
              (save to see changes)*
            </span>
          </div>
        </section>
        <br />
        <br />
        <section>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            required
          />
        </section>

        <br />
        <br />
        <section>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email.current}
            readOnly
            required
          />
        </section>
        <br />
        <br />

        <div className={updateBtnContainer}>
          <button
            type="submit"
            disabled={
              name === session.user.name &&
              (newAvatarId === session.user.photo?.id || newAvatarId === '')
            }
          >
            Save
          </button>
          <button
            type="reset"
            disabled={
              name === session.user.name &&
              (newAvatarId === session.user.photo?.id || newAvatarId === '')
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
