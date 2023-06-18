import styles from '../../app/category/[cat]/page.module.scss'

type Props = { categoryName: string }

export default function HeroText({ categoryName }: Props) {
  const { heroContainer } = styles
  return (
    <div className={heroContainer}>
      <h1>{categoryName}</h1>
    </div>
  )
}
