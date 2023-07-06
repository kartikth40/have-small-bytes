import {
  authorURL,
  categoriesType,
  loginType,
  postDetailsType,
  posts,
  recentPostsType,
  userAddedType,
  readerIdReturnType,
  profileAvatarsType,
  avatarType,
  deletedReaderIdReturnType,
  updateReaderType,
  postLikesCountType,
  postAddLikeType,
  postAddLikePublishType,
  checkPostLikeType,
  postDeleteLikeType,
} from '@/utils/types/types'
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
  addPostLikePublishQuery,
  addPostLikeQuery,
  authorUrlQuery,
  checkEmailQuery,
  checkIfPostLikeQuery,
  deletePostLikeQuery,
  deleteReaderQuery,
  getAllProfileAvatarQuery,
  getAvatarByIdQuery,
  getPostLikesQuery,
  loginQuery,
  newUserQuery,
  resetPasswordQuery,
  updateUserQuery,
} from '../utils/graphqlQueries'

interface ErrorType {
  response: { status: number }
}

function consoleLog(err: any, errorMessage: string) {
  const error = err as ErrorType
  console.log('|----ERROR')
  if (error.response.status === 429) {
    console.log(`|----Too many requests`)
    console.log(`|----> ${errorMessage}`)
  } else {
    console.log(`|----While ${errorMessage}|`)
    console.log(`|----> ${err}`)
  }
}

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!

export const myPortfolioURL = cache(async (authorId: string) => {
  try {
    const result: authorURL = await request(graphqlAPI, authorUrlQuery, {
      authorId,
    })
    return result.author.websiteUrl
  } catch (err) {
    consoleLog(err, 'extracting author URL')

    return '#'
  }
})

export const getPosts = cache(async () => {
  try {
    const result: posts = await request(graphqlAPI, PostsQuery)
    return result.posts
  } catch (err) {
    consoleLog(err, 'extracting posts')

    return []
  }
})

export const getFeaturedPosts = cache(async () => {
  try {
    const result: posts = await request(graphqlAPI, FeaturedPostsQuery)
    return result.posts
  } catch (err) {
    consoleLog(err, 'extracting featured posts')

    return []
  }
})

export const getCategoryPosts = cache(async (category: string) => {
  try {
    const result: posts = await request(graphqlAPI, CategoryPostsQuery, {
      category,
    })
    return result.posts
  } catch (err) {
    consoleLog(err, 'extracting certain category posts')

    return []
  }
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
    consoleLog(err, 'extracting certain category featured posts')

    return []
  }
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
    consoleLog(err, 'extracting post details')

    return null
  }
})

export const getRecentPosts = cache(async () => {
  try {
    const result: recentPostsType = await request(graphqlAPI, RecentPostsQuery)
    return result.posts
  } catch (err) {
    consoleLog(err, 'extracting recent posts')

    return []
  }
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
      consoleLog(err, 'extracting similar posts')

      return []
    }
  }
)

export const getCategories = cache(async () => {
  try {
    const result: categoriesType = await request(graphqlAPI, CategoriesQuery)
    return result.categories
  } catch (err) {
    consoleLog(err, 'extracting categories')

    return []
  }
})

export const checkLogin = cache(async (email: string) => {
  try {
    const result: loginType = await request(graphqlAPI, loginQuery, {
      email,
    })
    return result.reader
  } catch (err) {
    consoleLog(err, 'logging in the user')

    return null
  }
})

export const addUser = cache(
  async (name: string, email: string, password: string, photoId: string) => {
    try {
      const result: userAddedType = await request(graphqlAPI, newUserQuery, {
        name,
        email,
        password,
        photoId,
      })
      return result
    } catch (err) {
      consoleLog(err, 'registering new user')

      return null
    }
  }
)

export const checkUserExists = cache(async (email: string) => {
  try {
    const result: readerIdReturnType = await request(
      graphqlAPI,
      checkEmailQuery,
      {
        email,
      }
    )
    return result.reader ? true : false
  } catch (err) {
    consoleLog(err, 'checking user exists')

    return false
  }
})

export const updateUser = cache(
  async (userId: string, name: string, photoId: string) => {
    try {
      const result: updateReaderType = await request(
        graphqlAPI,
        updateUserQuery,
        {
          userId,
          name,
          photoId,
        }
      )
      return result
    } catch (err) {
      consoleLog(err, 'updating the user')

      return null
    }
  }
)

export const getAllProfileAvatars = cache(async () => {
  try {
    const result: profileAvatarsType = await request(
      graphqlAPI,
      getAllProfileAvatarQuery
    )
    return result.assets
  } catch (err) {
    consoleLog(err, 'extracting user profile avatars')

    return []
  }
})

export const getAvatarById = cache(async (id: string) => {
  try {
    const result: avatarType = await request(graphqlAPI, getAvatarByIdQuery, {
      id,
    })
    return result.asset.url
  } catch (err) {
    consoleLog(err, 'extracting user profile avatar')

    return '#'
  }
})

export const deleteUser = cache(async (userId: string) => {
  try {
    const result: deletedReaderIdReturnType = await request(
      graphqlAPI,
      deleteReaderQuery,
      {
        userId,
      }
    )
    return result.deleteReader
  } catch (err) {
    consoleLog(err, 'deleting the user')

    return null
  }
})

export const resetPassword = cache(async (userId: string, password: string) => {
  try {
    const result: updateReaderType = await request(
      graphqlAPI,
      resetPasswordQuery,
      { userId, password }
    )
    return result
  } catch (err) {
    consoleLog(err, 'resetting the user password')

    return null
  }
})

export const getPostLikes = cache(async (postId: string) => {
  try {
    const result: postLikesCountType = await request(
      graphqlAPI,
      getPostLikesQuery,
      {
        postId,
      }
    )
    return result.postLikesConnection.aggregate.count
  } catch (err) {
    consoleLog(err, 'getting post likes')

    return 0
  }
})

export const addPostLike = cache(async (postId: string, readerId: string) => {
  try {
    const postPlusReaderId = postId + readerId
    const like: postAddLikeType = await request(graphqlAPI, addPostLikeQuery, {
      postId,
      readerId,
      postPlusReaderId,
    })
    const likeId = like.createPostLike.id

    const result: postAddLikePublishType = await request(
      graphqlAPI,
      addPostLikePublishQuery,
      {
        likeId,
      }
    )
    return result.publishPostLike
  } catch (err) {
    consoleLog(err, 'adding like to posts')

    return null
  }
})

export const checkPostLike = cache(async (postId: string, readerId: string) => {
  try {
    const postPlusReaderId = postId + readerId
    const result: checkPostLikeType = await request(
      graphqlAPI,
      checkIfPostLikeQuery,
      {
        postPlusReaderId,
      }
    )
    return result.postLike ? true : false
  } catch (err) {
    consoleLog(err, 'checking if post liked')

    return false
  }
})

export const deletePostLike = cache(
  async (postId: string, readerId: string) => {
    try {
      const postPlusReaderId = postId + readerId
      const result: postDeleteLikeType = await request(
        graphqlAPI,
        deletePostLikeQuery,
        {
          postPlusReaderId,
        }
      )
      return result.deletePostLike ? true : false
    } catch (err) {
      consoleLog(err, 'deleting post likes')

      return false
    }
  }
)
