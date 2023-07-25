'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from '../../app/page.module.scss'
import { getCategoryPostsCount, getPostsCount } from '@/services'

type Props = {
  pageNo: number
  setPageNo: Dispatch<SetStateAction<number>>
  categorySlug: string
}

export default function PaginationButton({
  pageNo,
  setPageNo,
  categorySlug,
}: Props) {
  const postsPerPage = 3
  const [pages, setPages] = useState<number[]>([])

  function getPagesArray(count: number) {
    const pagesCount = Math.ceil(count / postsPerPage)
    const pagesArray = new Array(pagesCount).fill(1)
    return pagesArray
  }

  useEffect(() => {
    async function setTotalPostsCount() {
      if (!categorySlug) {
        const count = await getPostsCount()
        setPages(getPagesArray(count))
      } else {
        const count = await getCategoryPostsCount(categorySlug)
        setPages(getPagesArray(count))
      }
    }
    setTotalPostsCount()
  }, [])

  const { paginationContainer, pageDiv, selectedPage } = styles

  return (
    <div className={paginationContainer}>
      {pages.map((page, idx) => (
        <div
          className={`${pageDiv} ${pageNo === idx + 1 && selectedPage}`}
          key={idx}
          onClick={() => setPageNo(idx + 1)}
        >
          {idx + 1}
        </div>
      ))}
    </div>
  )
}
