'use client'
import SignOutButton from '@/components/buttons/SignOutButton '
import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
type Props = {}

export default function ProfilePage({}: Props) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (!session && !loading) {
    redirect(`/api/auth/signin?callbackUrl=/reader/profile`)
  }
  console.log(session)

  const [selected, setSelected] = useState<string>('profile')
  const name = useRef('kartik')
  const email = useRef('kartik@gmail.com')
  const pic = useRef('picture')

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
            Update Profile
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
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    onChange={(e) => {
                      name.current = e.target.value
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
                    onChange={(e) => {
                      email.current = e.target.value
                    }}
                    required
                  />
                </section>
                <br />
                <br />
                <section>
                  <label htmlFor="pic">Profile Pic</label>
                  <input
                    type="text"
                    placeholder="Pic"
                    name="pic"
                    onChange={(e) => {
                      pic.current = e.target.value
                    }}
                    required
                  />
                </section>

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
