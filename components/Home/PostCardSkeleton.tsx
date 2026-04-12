import styles from './postCardSkeleton.module.scss'
import pageStyles from '../../app/page.module.scss'

export default function PostCardSkeleton() {
  const s = styles

  return (
    <div className={`${pageStyles.postCard} ${s.skeletonCard}`}>
      {/* author row */}
      <div className={s.authorRow}>
        <div className={s.avatar} />
        <div className={s.authorName} />
        <div className={s.date} />
      </div>

      {/* hero image */}
      <div className={s.image} />

      {/* title */}
      <div className={s.title} />
      <div className={s.titleShort} />

      {/* summary */}
      <div className={s.summaryLine} />
      <div className={s.summaryLine} />
      <div className={s.summaryShort} />

      {/* reactions */}
      <div className={s.reactions}>
        <div className={s.btnGroup}>
          <div className={s.btn} />
          <div className={s.dot}>·</div>
          <div className={s.btn} />
          <div className={s.dot}>·</div>
          <div className={s.btn} />
        </div>
        <div className={s.readTime} />
      </div>
    </div>
  )
}
