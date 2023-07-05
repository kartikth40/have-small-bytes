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

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!

export const myPortfolioURL = cache(async (authorId: string) => {
  try {
    const result: authorURL = await request(graphqlAPI, authorUrlQuery, {
      authorId,
    })
    return result.author.websiteUrl
  } catch (err) {
    console.log('ERROR Extracting authorURL ----> ' + err)
    return '#'
  }
})

export const getPosts = cache(async () => {
  try {
    const result: posts = await request(graphqlAPI, PostsQuery)
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting Posts ----> ' + err)
    return []
  }
})

export const getFeaturedPosts = cache(async () => {
  try {
    const result: posts = await request(graphqlAPI, FeaturedPostsQuery)
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting Featured Posts ----> ' + err)
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
    console.log('ERROR Extracting certain category Posts ----> ' + err)
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
    console.log('ERROR Extracting certain category featured Posts ----> ' + err)
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
    console.log('ERROR Extracting Post Details ----> ' + err)
    return null
  }
})

export const getRecentPosts = cache(async () => {
  try {
    const result: recentPostsType = await request(graphqlAPI, RecentPostsQuery)
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting Recent Posts ----> ' + err)
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
      console.log('ERROR Extracting Similar Posts ----> ' + err)
      return []
    }
  }
)

export const getCategories = cache(async () => {
  try {
    const result: categoriesType = await request(graphqlAPI, CategoriesQuery)
    return result.categories
  } catch (err) {
    console.log('ERROR Extracting Categories ----> ' + err)
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
    console.log('ERROR Logging you in ----> ' + err)
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
      console.log('ERROR Registering new user ----> ' + err)
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
    console.log('ERROR checking user exists ----> ' + err)
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
      console.log('ERROR Updating the user ----> ' + err)
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
    console.log('ERROR Extracting profile avatars ----> ' + err)
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
    console.log('ERROR Extracting avatar ----> ' + err)
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
    console.log('ERROR Deleting the user ----> ' + err)
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
    console.log('ERROR Resetting the password ----> ' + err)
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
    console.log('ERROR getting post likes ----> ' + err)
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
    console.log('ERROR adding post like ----> ' + err)
    return null
  }
})

export const checkPostLike = cache(async (postId: string, readerId: string) => {
  try {
    const postPlusReaderId = postId + readerId
    console.log('---->', postPlusReaderId)
    const result: checkPostLikeType = await request(
      graphqlAPI,
      checkIfPostLikeQuery,
      {
        postPlusReaderId,
      }
    )
    console.log('---->', result)
    return result.postLike ? true : false
  } catch (err) {
    console.log('ERROR checking post like ----> ' + err)
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
      console.log('ERROR deleting post likes ----> ' + err)
      return false
    }
  }
)
