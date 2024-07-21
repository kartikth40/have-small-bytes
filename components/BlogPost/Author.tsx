import Image from 'next/image'
import styles from '../../app/post/[slug]/page.module.scss'
import Link from 'next/link'
import { myPortfolioURL } from '@/services'

type Props = {
  author: {
    id: string
    username: string
    name?: string
    bio: string
    photo: { url: string }
  }
}

export default async function Author({ author }: Props) {
  const {
    authorContainer,
    authorPhotoContainer,
    authorNameContainer,
    authorBioContainer,
    authorText,
    authorInfoContainer,
  } = styles
  const authorWebsiteUrl = (await myPortfolioURL(author.id)) || '/'
  return (
    <Link
      href={authorWebsiteUrl}
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
            boxShadow: 'inset 0 0 10px #000000'
          }}
          width={80}
          height={80}
          alt={author.name ?? author.username}
        />
      </div>
      <div className={authorInfoContainer}>
        <div className={authorText}>Author</div>
        <div className={authorNameContainer}>
          {author.name ?? author.username}
        </div>
        <div className={authorBioContainer}>{author.bio}</div>
      </div>
    </Link>
  )
}
