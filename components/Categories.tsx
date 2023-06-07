import styles from '../app/page.module.scss'

type Props = {}

function Categories({}: Props) {
  const { categoriesContainer } = styles
  return <div className={categoriesContainer}>Categories</div>
}

export default Categories
