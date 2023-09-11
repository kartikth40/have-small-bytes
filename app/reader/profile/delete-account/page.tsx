import DeleteAccount from '@/components/Profile/DeleteAccount'

export const metadata = {
  title: 'Delete Acount',
  description: 'Delete User Account page.',
}

type Props = {}

export default function page({}: Props) {
  return <DeleteAccount />
}
