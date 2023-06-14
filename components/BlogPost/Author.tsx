import Image from 'next/image'
import styles from '../../app/post/[slug]/page.module.scss'

type Props = {
  author: { id: string; name: string; bio: string; photo: { url: string } }
}

export default function Author({ author }: Props) {
  const {
    authorContainer,
    authorPhotoContainer,
    authorNameContainer,
    authorBioContainer,
    authorInfoContainer,
  } = styles
  return (
    <div className={authorContainer}>
      <div className={authorPhotoContainer}>
        <Image
          src={author.photo.url}
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
          }}
          width={100}
          height={100}
          alt={author.name}
        />
      </div>
      <div className={authorInfoContainer}>
        <div className={authorNameContainer}>{author.name}</div>
        <div className={authorBioContainer}>{author.bio}</div>
      </div>
    </div>
  )
}
