import { getCategories } from '@/services'
import Header from './Header'

export default async function HeaderServer() {
  const categories = await getCategories()
  return <Header categories={categories} />
}
