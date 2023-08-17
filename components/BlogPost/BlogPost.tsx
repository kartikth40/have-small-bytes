import postStyles from '@/app/post/[slug]/page.module.scss'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { postType } from '@/utils/types/types'
import { myPortfolioURL } from '@/services'
import Markdown from './Markdown'
import LikeButton from '../buttons/LikeButton'
import CommentButton from '../buttons/CommentButton'

export default async function BlogPost({ post }: { post: postType }) {
  const {
    blogPostContainer,
    postContent,
    postHeroImg,
    postInfoInfoContainerStart,
    date,
    icon,
    authorInfo,
    authorName,
    authorImage,
    userFeedbackContainerOnTop,
    feedbackBtnsContainer,
  } = postStyles

  const authorWebsiteUrl = (await myPortfolioURL(post.author.id)) || '/'
  return (
    <>
      <div className={postHeroImg}>
        <Image
          src={post.featuredImage.url}
          style={{ objectFit: 'cover' }}
          fill={true}
          alt={post.title}
        />
      </div>
      <div className={blogPostContainer}>
        <h1>{post.title}</h1>
        <div className={postInfoInfoContainerStart}>
          <Link
            href={`${authorWebsiteUrl}`}
            className={authorInfo}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className={authorImage}>
              <Image
                src={post.author.photo.url}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                sizes="(max-width: 768px) 40px, (max-width: 1200px) 50px, 40px"
                fill={true}
                alt={post.author.name}
              />
            </div>
            <p className={authorName}>{post.author.name}</p>
          </Link>
          <div className={date}>
            <div className={icon}>
              <Image
                width={48}
                height={48}
                src="https://img.icons8.com/fluency-systems-regular/48/calendar--v1.png"
                alt="cal"
              />
            </div>
            <p>{moment(post.createdAt).format('MMM DD, YYYY')}</p>
          </div>
        </div>
        <div className={postContent}>
          <Markdown content={post.content} />
        </div>
        <div className={userFeedbackContainerOnTop}>
          <div className={feedbackBtnsContainer}>
            <LikeButton
              postId={post.id}
              postSlug={post.slug}
              postAuthor={post.author.id}
              postTitle={post.title}
              showCount={false}
            />
            <CommentButton postId={post.id} canClick={true} showCount={false} />
          </div>
        </div>
      </div>
    </>
  )
}
