import styles from '../app/page.module.scss'
import skeletonStyles from './similarWidgetSkeleton.module.scss'

export default function SimilarWidgetSkeleton() {
  const { postWidgetsContainer } = styles
  return (
    <div className={postWidgetsContainer}>
      <h2>Related Posts</h2>
      {[1, 2, 3].map((i) => (
        <div key={i} className={skeletonStyles.card}>
          <div className={skeletonStyles.image} />
          <div className={skeletonStyles.content}>
            <div className={skeletonStyles.date} />
            <div className={skeletonStyles.title} />
            <div className={skeletonStyles.titleShort} />
          </div>
        </div>
      ))}
    </div>
  )
}
