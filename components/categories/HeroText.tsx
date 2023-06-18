import { nabla } from '@/app/layout'
import styles from '../../app/category/[cat]/page.module.scss'

type Props = { categoryName: string }

export default function HeroText({ categoryName }: Props) {
  const { heroContainer } = styles
  return (
    <div className={heroContainer}>
      <h1 className={nabla.className}>{categoryName}</h1>
    </div>
  )
}
