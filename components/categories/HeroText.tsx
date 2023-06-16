import styles from '../../app/category/[cat]/page.module.scss'

type Props = { cat: string }

export default function HeroText({ cat }: Props) {
  const { heroContainer } = styles
  return (
    <div className={heroContainer}>
      <h1>{cat}</h1>
    </div>
  )
}
