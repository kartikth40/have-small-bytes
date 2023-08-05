'use client'
import Image from 'next/image'
import styles from '../../app/post/[slug]/page.module.scss'
import ReactSyntaxHighlighter from './ReactSyntaxHighlighter'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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

export function CodeRenderer({ ...props }: any) {
  const {
    codeType,
    copyPasteBtn,
    codeBlockTopBar,
    codeBlockContainer,
    copied,
  } = styles
  const { inline, children, className } = props
  const language = className?.split('language-')[1]

  function handleCopied(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as Element
    target.classList.add(copied)
    setTimeout(() => {
      target.classList.remove(copied)
    }, 1500)
  }

  if (!inline)
    return (
      <div className={codeBlockContainer}>
        <div className={codeBlockTopBar}>
          <div className={codeType}>{language || 'code'}</div>
          <CopyToClipboard text={String(children)}>
            <button
              onClick={(e) => handleCopied(e)}
              className={copyPasteBtn}
            ></button>
          </CopyToClipboard>
        </div>

        <ReactSyntaxHighlighter language={language || 'cmd'}>
          {String(children)}
        </ReactSyntaxHighlighter>
      </div>
    )
  return <code className={className}>{children}</code>
}
