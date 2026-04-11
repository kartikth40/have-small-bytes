import styles from './pixel404.module.scss'

const FOUR = [
  [1,0,1],
  [1,0,1],
  [1,1,1],
  [0,0,1],
  [0,0,1],
]

const ZERO = [
  [1,1,1],
  [1,0,1],
  [1,0,1],
  [1,0,1],
  [1,1,1],
]

function Digit({ matrix }: { matrix: number[][] }) {
  return (
    <div className={styles.digit}>
      {matrix.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            className={`${styles.cell} ${cell ? styles.filled : styles.empty}`}
          />
        ))
      )}
    </div>
  )
}

export default function Pixel404() {
  return (
    <div className={styles.wrapper}>
      <Digit matrix={FOUR} />
      <Digit matrix={ZERO} />
      <Digit matrix={FOUR} />
    </div>
  )
}
