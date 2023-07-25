'use client'

import { useEffect, useState } from 'react'
import { getCategoryPosts, getPosts } from '@/services'
import styles from '../../app/page.module.scss'
import PostCard from './PostCard'
import { postsType } from '@/utils/types/types'
import PaginationButton from '../buttons/PaginationButton'

type Props = { categorySlug?: string }

function HomePagePosts({ categorySlug = '' }: Props) {
  const postsPerPage = 3
  const [posts, setPosts] = useState<postsType[] | []>([])
  const [pageNo, setPageNo] = useState<number>(1)

  useEffect(() => {
    async function setAllPosts() {
      // window.scrollTo(0, 0)
      if (categorySlug) {
        setPosts(
          await getCategoryPosts(categorySlug, (pageNo - 1) * postsPerPage)
        )
      } else {
        setPosts(await getPosts((pageNo - 1) * postsPerPage))
      }
    }
    setAllPosts()
  }, [pageNo])

  const { postsContainer } = styles

  return (
    <section className={postsContainer}>
      {posts?.map((post) => (
        <PostCard post={post} key={post.title}></PostCard>
      ))}
      <PaginationButton
        pageNo={pageNo}
        setPageNo={setPageNo}
        categorySlug={categorySlug}
      />
    </section>
  )
}

export default HomePagePosts
