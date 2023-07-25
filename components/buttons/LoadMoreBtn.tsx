'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from '../../app/page.module.scss'
import { getCategoryPosts, getPosts } from '@/services'
import { postsType } from '@/utils/types/types'
import PostCard from '../Home/PostCard'

type Props = {
  categorySlug: string
}

export default function LoadMoreBtn({ categorySlug }: Props) {
  const postsPerLoad = 3
  const [morePosts, setMorePosts] = useState<postsType[] | []>([])
  const [loadMore, setLoadMore] = useState<boolean>(true)
  const [loadNumber, setLoadNumber] = useState<number>(0)

  useEffect(() => {
    async function loading() {
      let newLoadedPosts: [postsType] | []
      if (!categorySlug) {
        newLoadedPosts = await getPosts(loadNumber * postsPerLoad)
      } else {
        newLoadedPosts = await getCategoryPosts(
          categorySlug,
          loadNumber * postsPerLoad
        )
      }
      if (newLoadedPosts.length < postsPerLoad) {
        setLoadMore(false)
      } else {
        setLoadMore(true)
      }
      setMorePosts((prev) => [...prev, ...newLoadedPosts])
    }
    if (loadNumber === 0 || !loadMore) return
    loading()
  }, [loadNumber])

  const handleLoadMore = () => {
    if (loadMore) setLoadNumber((prev) => prev + 1)
  }

  const { loadMoreContainer, noMore } = styles

  return (
    <>
      {morePosts?.map((post) => (
        <PostCard post={post} key={post.title}></PostCard>
      ))}
      <div className={loadMoreContainer}>
        <div className={`${!loadMore && noMore}`} onClick={handleLoadMore}>
          {loadMore ? 'Load More' : 'Thats all for now :)'}
        </div>
      </div>
    </>
  )
}
