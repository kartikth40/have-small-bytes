import styles from '../../app/page.module.scss'

type Props = {}

function HomePagePosts({}: Props) {
  const { postsContainer } = styles
  return <section className={postsContainer}>Posts</section>
}

export default HomePagePosts
