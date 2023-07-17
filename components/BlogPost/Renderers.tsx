'use client'
import Image from 'next/image'
import styles from '../../app/post/[slug]/page.module.scss'

export function ImageRenderer({ ...props }: any) {
  const { postImg, strict } = styles
  if (props.alt) {
    const substrings: string[] = props.alt?.split('||')
    const alt: string = substrings[0].trim()

    if (substrings[1]) {
      const properties = new Map()
      substrings[1].split('|').map((atr) => {
        const [key, value] = atr.trim().split(':')
        properties.set(key, value)
      })
      const width = properties.get('w')
      const height = properties.get('h')
      const aspectRatio = properties.get('aspectRatio')

      if (aspectRatio)
        return (
          <span
            className={postImg}
            style={{
              widows: '100%',
              aspectRatio: `${aspectRatio}`,
            }}
          >
            <Image
              src={props.src!}
              fill
              alt={alt}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 70vw"
              style={{
                objectFit: 'cover',
                borderRadius: '5px',
              }}
            />
          </span>
        )
      if (width && height)
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
      return (
        <span className={postImg}>
          <Image
            src={props.src!}
            alt={alt}
            width={200}
            height={200}
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
}
