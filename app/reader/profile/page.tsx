'use client'
import SignOutButton from '@/components/buttons/SignOutButton '
import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import ProfilePicModal from '@/components/modals/ProfilePicModal'
import Image from 'next/image'
type Props = {}

export default function ProfilePage({}: Props) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  useEffect(() => {
    if (!loading) {
      const user = session?.user
      setName(user ? user.name : '')
      setEmail(user ? user.email : '')
      setAvatarUrl(user && user.photo ? user.photo?.url : '')
    }
  }, [loading])

  if (!session && !loading) {
    redirect(`/api/auth/signin?callbackUrl=/reader/profile`)
  }

  const [selected, setSelected] = useState<string>('profile')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
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
  } = styles
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <div className={profilePageContainer}>
      <h2>Profile</h2>

      <div className={mainContainer}>
        <div className={sideMenu}>
          <div
            onClick={() => {
              setSelected('profile')
            }}
          >
            Update Profile {JSON.stringify(newAvatarId)}
          </div>
          <div
            onClick={() => {
              setSelected('reset')
            }}
          >
            Reset Password
          </div>
          <br />
          <div className={dangerZone}>
            <div
              className={deleteBtn}
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
                <h3>Update Profile</h3>
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
                    placeholder="Enter Email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    required
                  />
                </section>
                <br />
                <br />

                <br />
                <br />
                <div className={updateBtnContainer}>
                  <button type="submit">Update</button>
                  <button type="button">Reset</button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
