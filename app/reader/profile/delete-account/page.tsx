import DeleteAccount from '@/components/Profile/DeleteAccount'

export const metadata = {
  title: 'Delete Acount',
  description: 'Delete User Account page.',
  alternates: {
    canonical: '/reader/profile/delete-account',
    languages: {
      en: '/en/reader/profile/delete-account',
    },
  },
}

type Props = {}

export default function page({}: Props) {
  return <DeleteAccount />
}
