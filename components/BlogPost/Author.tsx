import Image from 'next/image'
import styles from '../../app/post/[slug]/page.module.scss'
import Link from 'next/link'

type Props = {
  author: { id: string; name: string; bio: string; photo: { url: string } }
}

export default function Author({ author }: Props) {
  const {
    authorContainer,
    authorPhotoContainer,
    authorNameContainer,
    authorBioContainer,
    authorText,
    authorInfoContainer,
  } = styles
  return (
    <Link
      href="https://kartik-thakur.tech/"
      rel="noopener noreferrer"
      target="_blank"
      className={authorContainer}
    >
      <div className={authorPhotoContainer}>
        <Image
          src={author.photo.url}
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
            border: '5px solid rgba(0, 0, 0, 0.1)',
          }}
          width={80}
          height={80}
          alt={author.name}
        />
      </div>
      <div className={authorInfoContainer}>
        <div className={authorText}>Author</div>
        <div className={authorNameContainer}>{author.name}</div>
        <div className={authorBioContainer}>{author.bio}</div>
      </div>
    </Link>
  )
}
