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
  }, [loading])
  const {
    headingsContainer,
    updateBtnContainer,
    updateForm,
    mainForm,
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
    await updateUser(session.user.id, name, newId!)
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

    toast.success('Profile Updated!', {
      autoClose: 3000,
      position: 'bottom-left',
    })
  }
  return (
    <form className={updateForm} onSubmit={(e) => handleSubmit(e)}>
      <div className={headingsContainer}>
        <h3>
          Update Profile
          <span
            className={`${formStatus} ${
              name === session.user.name &&
              (newAvatarId === session.user.photo?.id || newAvatarId === '') &&
              disable
            }`}
          >
            (unsaved changes)*
          </span>
        </h3>
      </div>
      <div className={mainForm}>
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
        </div>
      </div>
    </form>
  )
}
