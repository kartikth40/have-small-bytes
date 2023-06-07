import styles from '../app/page.module.scss'

type Props = {}

function RecentPosts({}: Props) {
  const { recentPostsContainer } = styles
  return <div className={recentPostsContainer}>Recent Posts</div>
}

export default RecentPosts
