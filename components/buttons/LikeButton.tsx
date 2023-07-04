import { CSSProperties } from 'react'
import styles from './likeBtn.module.scss'
export interface myCustomCSS extends CSSProperties {
  '--total-particles': number
  '--i': number
  '--color': string
}

type Props = {}

export default function LikeButton({}: Props) {
  const { like_button, like_wrapper, ripple, heart, particles, particle } =
    styles
  return (
    <button className={like_button}>
      <div className={like_wrapper}>
        <div className={ripple}></div>
        <svg className={heart} width="24" height="24" viewBox="0 0 24 24">
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
        </svg>
        <div
          className={particles}
          style={{ '--total-particles': 6 } as myCustomCSS}
        >
          <div
            className={particle}
            style={{ '--i': 1, '--color': '#7642F0' } as myCustomCSS}
          ></div>
          <div
            className={particle}
            style={{ '--i': 2, '--color': '#AFD27F' } as myCustomCSS}
          ></div>
          <div
            className={particle}
            style={{ '--i': 3, '--color': '#DE8F4F' } as myCustomCSS}
          ></div>
          <div
            className={particle}
            style={{ '--i': 4, '--color': '#D0516B' } as myCustomCSS}
          ></div>
          <div
            className={particle}
            style={{ '--i': 5, '--color': '#5686F2' } as myCustomCSS}
          ></div>
          <div
            className={particle}
            style={{ '--i': 6, '--color': '#D53EF3' } as myCustomCSS}
          ></div>
        </div>
      </div>
    </button>
  )
}
