import SignOutButton from '@/components/buttons/SignOutButton '
import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

type Props = {}

export default async function ProfilePage({}: Props) {
  const session = await getServerSession(authOptions)
  // const loading = status === 'loading'

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/reader/profile`)
  }

  // const [selected, setSelected] = useState<string>('profile')

  const { profilePageContainer, mainContainer, sideMenu, content } = styles
  return (
    <div className={profilePageContainer}>
      <h2>Profile Page</h2>

      <div className={mainContainer}>
        <div className={sideMenu}>
          <ul>
            <li
            // className={`${
            //   selected === 'profile' ? 'selected' : 'unselected'
            // }`}
            >
              Profile
            </li>
            <li
            // className={`${
            //   selected === 'signout' ? 'selected' : 'unselected'
            // }`}
            >
              Sign Out
            </li>
          </ul>
        </div>
        <div className={content}>
          {/* {selected === 'profile' && 'Profile Pic'}
          {selected === 'signout' && <SignOutButton />} */}
        </div>
      </div>
    </div>
  )
}
