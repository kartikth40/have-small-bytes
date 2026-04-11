import styles from './loading.module.scss'

export default function Loading() {
  return (
    <div className={styles.container}>
      {/* hero image */}
      <div className={styles.hero} />

      <div className={styles.body}>
        {/* title */}
        <div className={`${styles.line} ${styles.title}`} />

        {/* meta row: author + date + views */}
        <div className={styles.meta}>
          <div className={styles.avatar} />
          <div className={`${styles.line} ${styles.metaText}`} />
          <div className={`${styles.line} ${styles.metaText}`} />
          <div className={`${styles.line} ${styles.metaText}`} />
        </div>

        {/* content lines */}
        <div className={styles.content}>
          {[100, 95, 100, 88, 92, 100, 75, 98, 85, 100, 60].map((w, i) => (
            <div key={i} className={styles.line} style={{ width: `${w}%` }} />
          ))}
          <div className={`${styles.line} ${styles.subheading}`} />
          {[100, 93, 100, 87, 95, 100, 70].map((w, i) => (
            <div key={i} className={styles.line} style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
