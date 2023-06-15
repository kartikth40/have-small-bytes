import Link from 'next/link'
import styles from '../app/page.module.scss'
import Image from 'next/image'

type Props = {}

export default function Footer({}: Props) {
  const { footerContainer, footer, logo, tagLine, copyrights } = styles
  const currentDate = new Date().getFullYear()
  return (
    <div className={footerContainer}>
      <div className={footer}>
        <div className={logo}>
          {' '}
          <Link href="/">
            <Image
              src="/icons/hsb-icon.png"
              style={{ objectFit: 'cover' }}
              // sizes="(max-width: 768px) 40px, (max-width: 1200px) 50px, 40px"
              width={70}
              height={70}
              alt={'Logo'}
            />
          </Link>
        </div>
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
