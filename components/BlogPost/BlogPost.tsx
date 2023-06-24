import styles from '../../app/post/[slug]/page.module.scss'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { postType } from '@/utils/types/types'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default async function BlogPost({ post }: { post: postType }) {
  const {
    blogPostContainer,
    postContent,
    postHeroImg,
    authorInfoContainerStart,
    date,
    icon,
    authorInfo,
    authorName,
    authorImage,
    postImg,
    strict,
  } = styles

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
        <div className={authorInfoContainerStart}>
          <Link href={`author/${post.author.id}`} className={authorInfo}>
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
          <ReactMarkdown
            components={{
              img: function ({ ...props }) {
                if (props.alt) {
                  const substrings: string[] = props.alt?.split('{{')
                  const alt: string = substrings[0].trim()

                  if (substrings[1]) {
                    const width = Number(
                      substrings[1].match(/(?<=w:\s?)\d+/g)![0]
                    )
                    const height = Number(
                      substrings[1].match(/(?<=h:\s?)\d+/g)![0]
                    )

                    return (
                      <span className={postImg}>
                        <Image
                          src={props.src!}
                          alt={alt}
                          width={width}
                          height={height!}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 70vw"
                          style={{ objectFit: 'cover', borderRadius: '5px' }}
                        />
                      </span>
                    )
                  }

                  return (
                    <span className={`${postImg} ${strict}`}>
                      <Image
                        src={props.src!}
                        alt={alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 70vw"
                        style={{ objectFit: 'cover', borderRadius: '5px' }}
                      />
                    </span>
                  )
                }
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  )
}
