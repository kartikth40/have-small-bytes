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
  postCommentsCountType,
  postAddCommentType,
  postAddCommentPublishType,
  getPostCommentsType,
  postDeleteCommentType,
  postUpdateCommentType,
  postDeleteCommentRepliesType,
  postType,
  postsType,
  postsCountType,
  sendNotificationType,
  publishSendNotificationType,
  notifyType,
  entityType,
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
  addCommentDraftQuery,
  addCommentPublisheQuery,
  addCommentReplyDraftQuery,
  addCommentReplyPublisheQuery,
  addPostLikePublishQuery,
  addPostLikeQuery,
  authorUrlQuery,
  checkEmailQuery,
  checkIfPostLikeQuery,
  deletePostCommentQuery,
  deletePostCommentRepliesQuery,
  deletePostLikeQuery,
  deleteReaderQuery,
  getAllProfileAvatarQuery,
  getAvatarByIdQuery,
  getPostCommentsCountQuery,
  getPostCommentsQuery,
  getPostCommentsRepliesCountQuery,
  getPostCommentsRepliesQuery,
  getPostLikesQuery,
  getPostsCountQuery,
  loginQuery,
  newUserQuery,
  publishSendNotificationQuery,
  resetPasswordQuery,
  sendNotificationQuery,
  updateCommentQuery,
  updateUserQuery,
} from '../utils/graphqlQueries'

interface ErrorType {
  response: { status: number }
}

function consoleLog(err: any, errorMessage: string) {
  const error = err as ErrorType
  console.log('|----ERROR')
  if (error.response?.status === 429) {
    console.log(`|----Too many requests`)
    console.log(`|----> ${errorMessage}`)
  } else {
    console.log(`|----While ${errorMessage}|`)
    console.log(`|----> ${err}`)
  }
}

async function retryAPICall(apiCall: any, retryMessage: string = '') {
  const maxRetries = 5
  const retryInterval = 1000

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
    try {
      const result = await apiCall()
      return result // Return the result if the API call succeeds.
    } catch (err) {
      const error = err as ErrorType
      if (retryCount !== maxRetries - 1) {
        if (error.response?.status === 429)
          console.log('(API limit exceeds) Retrying...', retryMessage)
      } else console.log('Retrying...', retryMessage)
      if (retryCount === maxRetries - 1) {
        throw err // Throw last error if all retries are exhausted.
      }
      await sleep(retryInterval)
    }
  }
}

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!

export const myPortfolioURL = cache(
  async (authorId: string): Promise<string> => {
    async function thisFunction() {
      const result: authorURL = await request(graphqlAPI, authorUrlQuery, {
        authorId,
      })
      return result.reader.websiteUrl
    }
    try {
      const res = await retryAPICall(thisFunction, 'extracting author URL')
      return res
    } catch (err) {
      consoleLog(err, 'extracting author URL')
      return '#'
    }
  }
)

export const getPostsCount = cache(async (): Promise<number> => {
  async function thisFunction() {
    const result: postsCountType = await request(graphqlAPI, getPostsCountQuery)
    return result.postsConnection.aggregate.count
  }
  try {
    const res = await retryAPICall(thisFunction, 'getting posts count')
    return res
  } catch (err) {
    consoleLog(err, 'getting posts count')

    return 0
  }
})

export const getPosts = cache(
  async (skip: number = 0): Promise<[postsType] | []> => {
    async function thisFunction() {
      const result: posts = await request(graphqlAPI, PostsQuery, { skip })
      return result.posts
    }
    try {
      const res = await retryAPICall(thisFunction, 'extracting posts')
      return res
    } catch (err) {
      consoleLog(err, 'extracting posts')

      return []
    }
  }
)

export const getFeaturedPosts = cache(async (): Promise<[postsType] | []> => {
  async function thisFunction() {
    const result: posts = await request(graphqlAPI, FeaturedPostsQuery)
    return result.posts
  }
  try {
    const res = await retryAPICall(thisFunction, 'extracting featured posts')
    return res
  } catch (err) {
    consoleLog(err, 'extracting featured posts')

    return []
  }
})

export const getCategoryPostsCount = cache(
  async (category: string): Promise<number> => {
    async function thisFunction() {
      const result: postsCountType = await request(
        graphqlAPI,
        getPostsCountQuery,
        { category }
      )
      return result.postsConnection.aggregate.count
    }
    try {
      const res = await retryAPICall(
        thisFunction,
        'getting category posts count'
      )
      return res
    } catch (err) {
      consoleLog(err, 'getting category posts count')

      return 0
    }
  }
)

export const getCategoryPosts = cache(
  async (category: string, skip: number = 0): Promise<[postsType] | []> => {
    async function thisFunction() {
      const result: posts = await request(graphqlAPI, CategoryPostsQuery, {
        category,
        skip,
      })
      return result.posts
    }
    try {
      const res = await retryAPICall(
        thisFunction,
        'extracting certain category posts'
      )
      return res
    } catch (err) {
      consoleLog(err, 'extracting certain category posts')

      return []
    }
  }
)

export const getFeaturedCategoryPosts = cache(
  async (category: string): Promise<[postsType] | []> => {
    async function thisFunction() {
      const result: posts = await request(
        graphqlAPI,
        FeaturedCategoryPostsQuery,
        { category }
      )
      return result.posts
    }
    try {
      const res = await retryAPICall(
        thisFunction,
        'extracting certain category featured posts'
      )
      return res
    } catch (err) {
      consoleLog(err, 'extracting certain category featured posts')

      return []
    }
  }
)

export const getPostDetails = cache(
  async (slug: string): Promise<postType | null> => {
    async function thisFunction() {
      const result: postDetailsType = await request(
        graphqlAPI,
        PostDetailsQuery,
        {
          slug,
        }
      )
      return result?.post
    }
    try {
      const res = await retryAPICall(thisFunction, 'extracting post details')
      return res
    } catch (err) {
      consoleLog(err, 'extracting post details')

      return null
    }
  }
)

export const getRecentPosts = cache(
  async (): Promise<recentPostsType['posts'] | []> => {
    async function thisFunction() {
      const result: recentPostsType = await request(
        graphqlAPI,
        RecentPostsQuery
      )
      return result.posts
    }
    try {
      const res = await retryAPICall(thisFunction, 'extracting recent posts')
      return res
    } catch (err) {
      consoleLog(err, 'extracting recent posts')

      return []
    }
  }
)

export const getSimilarPosts = cache(
  async (
    categories: string[],
    slug: string
  ): Promise<recentPostsType['posts'] | []> => {
    async function thisFunction() {
      const result: recentPostsType = await request(
        graphqlAPI,
        SimilarPostsQuery,
        {
          categories,
          slug,
        }
      )
      return result.posts
    }
    try {
      const res = await retryAPICall(thisFunction, 'extracting similar posts')
      return res
    } catch (err) {
      consoleLog(err, 'extracting similar posts')

      return []
    }
  }
)

export const getCategories = cache(
  async (): Promise<categoriesType['categories'] | []> => {
    async function thisFunction() {
      const result: categoriesType = await request(graphqlAPI, CategoriesQuery)
      return result.categories
    }
    try {
      const res = await retryAPICall(thisFunction, 'extracting categories')
      return res
    } catch (err) {
      consoleLog(err, 'extracting categories')

      return []
    }
  }
)

export const checkLogin = cache(
  async (email: string): Promise<loginType['reader'] | null> => {
    async function thisFunction() {
      const result: loginType = await request(graphqlAPI, loginQuery, {
        email,
      })
      return result.reader
    }
    try {
      const res = await retryAPICall(thisFunction, 'logging in the user')
      return res
    } catch (err) {
      consoleLog(err, 'logging in the user')

      return null
    }
  }
)

export const addUser = cache(
  async (
    name: string,
    email: string,
    password: string,
    photoId: string
  ): Promise<userAddedType | null> => {
    async function thisFunction() {
      const result: userAddedType = await request(graphqlAPI, newUserQuery, {
        name,
        email,
        password,
        photoId,
      })
      return result
    }
    try {
      const res = await retryAPICall(thisFunction, 'registering new user')
      return res
    } catch (err) {
      consoleLog(err, 'registering new user')

      return null
    }
  }
)

export const checkUserExists = cache(
  async (email: string): Promise<boolean> => {
    async function thisFunction() {
      const result: readerIdReturnType = await request(
        graphqlAPI,
        checkEmailQuery,
        {
          email,
        }
      )
      return result.reader ? true : false
    }
    try {
      const res = await retryAPICall(thisFunction, 'checking user exists')
      return res
    } catch (err) {
      consoleLog(err, 'checking user exists')

      return false
    }
  }
)

export const updateUser = cache(
  async (
    userId: string,
    name: string,
    photoId: string
  ): Promise<updateReaderType | null> => {
    async function thisFunction() {
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
    }
    try {
      const res = await retryAPICall(thisFunction, 'updating the user')
      return res
    } catch (err) {
      consoleLog(err, 'updating the user')

      return null
    }
  }
)

export const getAllProfileAvatars = cache(
  async (): Promise<profileAvatarsType['assets'] | []> => {
    async function thisFunction() {
      const result: profileAvatarsType = await request(
        graphqlAPI,
        getAllProfileAvatarQuery
      )
      return result.assets
    }
    try {
      const res = await retryAPICall(
        thisFunction,
        'extracting user profile avatars'
      )
      return res
    } catch (err) {
      consoleLog(err, 'extracting user profile avatars')

      return []
    }
  }
)

export const getAvatarById = cache(async (id: string): Promise<string> => {
  async function thisFunction() {
    const result: avatarType = await request(graphqlAPI, getAvatarByIdQuery, {
      id,
    })
    return result.asset.url
  }
  try {
    const res = await retryAPICall(
      thisFunction,
      'extracting user profile avatar'
    )
    return res
  } catch (err) {
    consoleLog(err, 'extracting user profile avatar')

    return '#'
  }
})

export const deleteUser = cache(
  async (
    userId: string
  ): Promise<deletedReaderIdReturnType['deleteReader'] | null> => {
    async function thisFunction() {
      const result: deletedReaderIdReturnType = await request(
        graphqlAPI,
        deleteReaderQuery,
        {
          userId,
        }
      )
      return result.deleteReader
    }
    try {
      const res = await retryAPICall(thisFunction, 'deleting the user')
      return res
    } catch (err) {
      consoleLog(err, 'deleting the user')

      return null
    }
  }
)

export const resetPassword = cache(
  async (
    userId: string,
    password: string
  ): Promise<updateReaderType | null> => {
    async function thisFunction() {
      const result: updateReaderType = await request(
        graphqlAPI,
        resetPasswordQuery,
        { userId, password }
      )
      return result
    }
    try {
      const res = await retryAPICall(
        thisFunction,
        'resetting the user password'
      )
      return res
    } catch (err) {
      consoleLog(err, 'resetting the user password')

      return null
    }
  }
)

export const getPostLikes = cache(async (postId: string): Promise<number> => {
  async function thisFunction() {
    const result: postLikesCountType = await request(
      graphqlAPI,
      getPostLikesQuery,
      {
        postId,
      }
    )
    return result.postLikesConnection.aggregate.count
  }
  try {
    const res = await retryAPICall(thisFunction, 'getting post likes')
    return res
  } catch (err) {
    consoleLog(err, 'getting post likes')

    return 0
  }
})

export const addPostLike = cache(
  async (
    postId: string,
    readerId: string
  ): Promise<postAddLikePublishType['publishPostLike'] | null> => {
    async function thisFunction() {
      const postPlusReaderId = postId + readerId
      const like: postAddLikeType = await request(
        graphqlAPI,
        addPostLikeQuery,
        {
          postId,
          readerId,
          postPlusReaderId,
        }
      )
      const likeId = like.createPostLike.id

      const result: postAddLikePublishType = await request(
        graphqlAPI,
        addPostLikePublishQuery,
        {
          likeId,
        }
      )
      return result.publishPostLike
    }
    try {
      const res = await retryAPICall(thisFunction, 'adding like to posts')
      return res
    } catch (err) {
      consoleLog(err, 'adding like to posts')

      return null
    }
  }
)

export const checkPostLike = cache(
  async (postId: string, readerId: string): Promise<boolean> => {
    async function thisFunction() {
      const postPlusReaderId = postId + readerId
      const result: checkPostLikeType = await request(
        graphqlAPI,
        checkIfPostLikeQuery,
        {
          postPlusReaderId,
        }
      )
      return result.postLike ? true : false
    }
    try {
      const res = await retryAPICall(thisFunction, 'checking if post liked')
      return res
    } catch (err) {
      consoleLog(err, 'checking if post liked')

      return false
    }
  }
)

export const deletePostLike = cache(
  async (postId: string, readerId: string): Promise<boolean> => {
    async function thisFunction() {
      const postPlusReaderId = postId + readerId
      const result: postDeleteLikeType = await request(
        graphqlAPI,
        deletePostLikeQuery,
        {
          postPlusReaderId,
        }
      )
      return result.deletePostLike ? true : false
    }
    try {
      const res = await retryAPICall(thisFunction, 'deleting post likes')
      return res
    } catch (err) {
      consoleLog(err, 'deleting post likes')

      return false
    }
  }
)

export const getCommentsCount = cache(
  async (postId: string): Promise<number> => {
    async function thisFunction() {
      const result: postCommentsCountType = await request(
        graphqlAPI,
        getPostCommentsCountQuery,
        {
          postId,
        }
      )
      return result.commentsConnection.aggregate.count
    }
    try {
      const res = await retryAPICall(
        thisFunction,
        'getting post comments count'
      )
      return res
    } catch (err) {
      consoleLog(err, 'getting post comments count')

      return 0
    }
  }
)

export const getCommentRepliesCount = cache(
  async (commentId: string): Promise<number> => {
    async function thisFunction() {
      const result: postCommentsCountType = await request(
        graphqlAPI,
        getPostCommentsRepliesCountQuery,
        {
          commentId,
        }
      )
      return result.commentsConnection.aggregate.count
    }
    try {
      const res = await retryAPICall(
        thisFunction,
        'getting post comments replies count'
      )
      return res
    } catch (err) {
      consoleLog(err, 'getting post comments replies count')

      return 0
    }
  }
)

export const addComment = cache(
  async (
    comment: string,
    postId: string,
    readerId: string
  ): Promise<boolean> => {
    async function thisFunction() {
      const com: postAddCommentType = await request(
        graphqlAPI,
        addCommentDraftQuery,
        {
          comment,
          postId,
          readerId,
        }
      )
      const commentId = com.createComment.id

      const result: postAddCommentPublishType = await request(
        graphqlAPI,
        addCommentPublisheQuery,
        {
          commentId,
        }
      )
      return result.publishComment ? true : false
    }
    try {
      const res = await retryAPICall(thisFunction, 'adding post comment')
      return res
    } catch (err) {
      consoleLog(err, 'adding post comment')

      return false
    }
  }
)

export const addCommentReply = cache(
  async (
    comment: string,
    postId: string,
    readerId: string,
    commentId: string
  ): Promise<boolean> => {
    async function thisFunction() {
      const reply: postAddCommentType = await request(
        graphqlAPI,
        addCommentReplyDraftQuery,
        {
          comment,
          postId,
          readerId,
          commentId,
        }
      )
      const newCommentId = reply.createComment.id

      const result: postAddCommentPublishType = await request(
        graphqlAPI,
        addCommentReplyPublisheQuery,
        {
          newCommentId,
        }
      )
      return result.publishComment ? true : false
    }
    try {
      const res = await retryAPICall(
        thisFunction,
        'adding post comment replies'
      )
      return res
    } catch (err) {
      consoleLog(err, 'adding post comment replies')

      return false
    }
  }
)

export const getComments = cache(
  async (postId: string): Promise<getPostCommentsType['comments'] | []> => {
    async function thisFunction() {
      const result: getPostCommentsType = await request(
        graphqlAPI,
        getPostCommentsQuery,
        {
          postId,
        }
      )
      return result.comments
    }
    try {
      const res = await retryAPICall(thisFunction, 'getting post comments')
      return res
    } catch (err) {
      consoleLog(err, 'getting post comments')

      return []
    }
  }
)

export const getCommentReplies = cache(
  async (commentId: string): Promise<getPostCommentsType['comments'] | []> => {
    async function thisFunction() {
      const result: getPostCommentsType = await request(
        graphqlAPI,
        getPostCommentsRepliesQuery,
        {
          commentId,
        }
      )
      return result.comments
    }
    try {
      const res = await retryAPICall(
        thisFunction,
        'getting post comments replies'
      )
      return res
    } catch (err) {
      consoleLog(err, 'getting post comments replies')

      return []
    }
  }
)

export const updateComment = cache(
  async (commentId: string, comment: string): Promise<boolean> => {
    async function thisFunction() {
      const updated: postUpdateCommentType = await request(
        graphqlAPI,
        updateCommentQuery,
        {
          commentId,
          comment,
        }
      )

      const result: postAddCommentPublishType = await request(
        graphqlAPI,
        addCommentPublisheQuery,
        {
          commentId,
        }
      )
      return result.publishComment && updated.updateComment ? true : false
    }
    try {
      const res = await retryAPICall(thisFunction, 'updating post comment')
      return res
    } catch (err) {
      consoleLog(err, 'updating post comment')

      return false
    }
  }
)

export const deleteComment = cache(
  async (commentId: string): Promise<boolean> => {
    async function thisFunction() {
      const result: postDeleteCommentType = await request(
        graphqlAPI,
        deletePostCommentQuery,
        {
          commentId,
        }
      )
      return result.deleteComment ? true : false
    }
    try {
      const res = await retryAPICall(thisFunction, 'deleting post comment')
      return res
    } catch (err) {
      consoleLog(err, 'deleting post comment')

      return false
    }
  }
)

export const deleteCommentReplies = cache(
  async (commentId: string): Promise<boolean> => {
    async function thisFunction() {
      const result: postDeleteCommentRepliesType = await request(
        graphqlAPI,
        deletePostCommentRepliesQuery,
        {
          commentId,
        }
      )
      return result.deleteManyComments.count >= 0 ? true : false
    }
    try {
      const res = await retryAPICall(
        thisFunction,
        'deleting post comment replies'
      )
      return res
    } catch (err) {
      consoleLog(err, 'deleting post comment replies')

      return false
    }
  }
)

export const sendNotification = cache(
  async (
    notifyType: notifyType,
    entityType: entityType,
    postSlug: string,
    entity: string,
    actorId: string,
    notifierId: string,
    commentId: string = ''
  ): Promise<boolean> => {
    if (actorId === notifierId) return false
    async function thisFunction() {
      const noti: sendNotificationType = await request(
        graphqlAPI,
        sendNotificationQuery,
        {
          notifyType,
          entityType,
          commentId,
          postSlug,
          entity,
          actorId,
          notifierId,
        }
      )
      const id = noti.createNotification.id

      const result: publishSendNotificationType = await request(
        graphqlAPI,
        publishSendNotificationQuery,
        {
          id,
        }
      )
      return result.publishNotification ? true : false
    }
    try {
      const res = await retryAPICall(thisFunction, 'sending notification')
      return res
    } catch (err) {
      consoleLog(err, 'sending notification')

      return false
    }
  }
)
