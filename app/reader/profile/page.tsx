import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignOutButton from '@/components/buttons/SignOutButton '
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

export default async function ProfilePage({}: Props) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/reader/profile`)
  }
  return (
    <div>
      Profile Page.
      <div>
        <SignOutButton />
      </div>
    </div>
  )
}
