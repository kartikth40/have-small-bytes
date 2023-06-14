import styles from '../app/page.module.scss'

type Props = {}

export default function Footer({}: Props) {
  const { footerContainer, footer, logo, tagLine, copyrights } = styles
  return (
    <div className={footerContainer}>
      <div className={footer}>
        <div className={logo}>HSB</div>
        <div className={tagLine}>Byte Size Knowledge</div>
        <div className={copyrights}>© Kartik Thakur 2023</div>
      </div>
    </div>
  )
}
