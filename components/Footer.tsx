import Link from 'next/link'
import styles from '../app/page.module.scss'

type Props = {}

export default function Footer({}: Props) {
  const { footerContainer, footer, logo, tagLine, copyrights } = styles
  const currentDate = new Date().getFullYear()
  return (
    <div className={footerContainer}>
      <div className={footer}>
        <div className={logo}>HSB</div>
        <div className={tagLine}>Have Small Bytes</div>
        <div className={copyrights}>
          <Link
            href="https://kartik-thakur.tech/"
            rel="noopener noreferrer"
            target="_blank"
          >
            © Kartik Thakur {currentDate}
          </Link>
        </div>
      </div>
    </div>
  )
}
