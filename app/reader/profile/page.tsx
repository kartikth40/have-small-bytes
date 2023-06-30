'use client'
import SignOutButton from '@/components/buttons/SignOutButton '
import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import ProfilePicModal from '@/components/modals/ProfilePicModal'
import { getAvatarById, updateUser } from '@/services'
import { toast } from 'react-toastify'
import { Session } from 'inspector'

type Props = {}

export default function ProfilePage({}: Props) {
  const { data: session, status, update } = useSession()
  const loading = status === 'loading'

  useEffect(() => {
    if (!loading) {
      const user = session?.user
      setName(user ? user.name : '')
      email.current = user ? user.email : ''
      setAvatarUrl(user && user.photo ? user.photo?.url : '')
    }
  }, [loading])

  const [selected, setSelected] = useState<string>('profile')
  const [name, setName] = useState<string>('')
  const email = useRef('')
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [newAvatarId, setNewAvatarId] = useState<string>('')

  const {
    profilePageContainer,
    mainContainer,
    sideMenu,
    contentContainer,
    headingsContainer,
    updateBtnContainer,
    updateForm,
    mainForm,
    dangerZone,
    deleteBtn,
    profilePicContainer,
    loadingState,
    selectedBtn,
    formStatus,
    disable,
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
    // console.log(session)
    // console.log(newId)
    // console.log(newUrl)
    // console.log(newAvatarId)
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
    <div className={profilePageContainer}>
      <h2>Profile</h2>

      <div className={mainContainer}>
        <div className={sideMenu}>
          <div
            className={`${selected === 'profile' && selectedBtn}`}
            onClick={() => {
              setSelected('profile')
            }}
          >
            Update Profile
          </div>
          <div
            className={`${selected === 'reset' && selectedBtn}`}
            onClick={() => {
              setSelected('reset')
            }}
          >
            Reset Password
          </div>
          <br />
          <div className={dangerZone}>
            <div
              className={`${selected === 'delete' && selectedBtn} ${deleteBtn}`}
              onClick={() => {
                setSelected('delete')
              }}
            >
              Delete Account
            </div>
            <div>
              <SignOutButton />
            </div>
          </div>
        </div>
        <div className={contentContainer}>
          {selected === 'profile' && (
            <form className={updateForm} onSubmit={(e) => handleSubmit(e)}>
              <div className={headingsContainer}>
                <h3>
                  Update Profile
                  <span
                    className={`${formStatus} ${
                      name === session.user.name &&
                      (newAvatarId === session.user.photo?.id ||
                        newAvatarId === '') &&
                      disable
                    }`}
                  >
                    (unsaved changes)*
                  </span>
                </h3>
              </div>
              <div className={mainForm}>
                <section>
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
                        name === session.user.name &&
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
                      (newAvatarId === session.user.photo?.id ||
                        newAvatarId === '')
                    }
                  >
                    Save
                  </button>
                  {/* <button
                    type="button"
                    disabled={
                      name === session.user.name &&
                      (newAvatarId === session.user.photo?.id ||
                        newAvatarId === '')
                    }
                  >
                    Reset
                  </button> */}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
