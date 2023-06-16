import {
  categoriesType,
  postDetailsType,
  posts,
  recentPostsType,
} from '@/utils/types'
import { request } from 'graphql-request'
import { cache } from 'react'
import {
  CategoriesQuery,
  CategoryPostsQuery,
  FeaturedCategoryPostsQuery,
  FeaturedPostsQuery,
  PostDetailsQuery,
  PostsQuery,
  RecentPostsQuery,
  SimilarPostsQuery,
} from '../utils/graphqlQueries'

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!

export const getPosts = cache(async () => {
  try {
    const result: posts = await request(graphqlAPI, PostsQuery)
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting Posts ----> ' + err)
  }
  return []
})

export const getFeaturedPosts = cache(async () => {
  try {
    const result: posts = await request(graphqlAPI, FeaturedPostsQuery)
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting Featured Posts ----> ' + err)
  }
  return []
})

export const getCategoryPosts = cache(async (category: string) => {
  try {
    const result: posts = await request(graphqlAPI, CategoryPostsQuery, {
      category,
    })
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting certain category Posts ----> ' + err)
  }
  return []
})

export const getFeaturedCategoryPosts = cache(async (category: string) => {
  try {
    const result: posts = await request(
      graphqlAPI,
      FeaturedCategoryPostsQuery,
      { category }
    )
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting certain category featured Posts ----> ' + err)
  }
  return []
})

export const getPostDetails = cache(async (slug: string) => {
  try {
    const result: postDetailsType = await request(
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
    const result: recentPostsType = await request(graphqlAPI, RecentPostsQuery)
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting Recent Posts ----> ' + err)
  }
  return []
})

export const getSimilarPosts = cache(
  async (categories: string[], slug: string) => {
    try {
      const result: recentPostsType = await request(
        graphqlAPI,
        SimilarPostsQuery,
        {
          categories,
          slug,
        }
      )
      return result.posts
    } catch (err) {
      console.log('ERROR Extracting Similar Posts ----> ' + err)
    }
    return []
  }
)

export const getCategories = cache(async () => {
  try {
    const result: categoriesType = await request(graphqlAPI, CategoriesQuery)
    return result.categories
  } catch (err) {
    console.log('ERROR Extracting Categories ----> ' + err)
  }
  return []
})
