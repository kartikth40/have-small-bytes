import {
  categories,
  postDetailsResult,
  postsResult,
  recentPosts,
} from '@/utils/types'
import { request } from 'graphql-request'
import { cache } from 'react'
import {
  CategoriesQuery,
  PostDetailsQuery,
  PostsQuery,
  RecentPostsQuery,
  SimilarPostsQuery,
} from './graphqlQueries'

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!

export const getPosts = cache(async () => {
  try {
    const result: postsResult = await request(graphqlAPI, PostsQuery)
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting Posts ----> ' + err)
  }
  return []
})

export const getPostDetails = cache(async (slug: string) => {
  try {
    const result: postDetailsResult = await request(
      graphqlAPI,
      PostDetailsQuery,
      {
        slug,
      }
    )
    return result?.post
  } catch (err) {
    console.log('ERROR Extracting Post Details ----> ' + err)
  }
})

export const getRecentPosts = cache(async () => {
  try {
    const result: recentPosts = await request(graphqlAPI, RecentPostsQuery)
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting Recent Posts ----> ' + err)
  }
  return []
})

export const getSimilarPosts = cache(
  async (categories: string[], slug: string) => {
    try {
      const result: recentPosts = await request(graphqlAPI, SimilarPostsQuery, {
        categories,
        slug,
      })
      return result.posts
    } catch (err) {
      console.log('ERROR Extracting Similar Posts ----> ' + err)
    }
    return []
  }
)

export const getCategories = cache(async () => {
  try {
    const result: categories = await request(graphqlAPI, CategoriesQuery)
    return result.categories
  } catch (err) {
    console.log('ERROR Extracting Categories ----> ' + err)
  }
  return []
})
