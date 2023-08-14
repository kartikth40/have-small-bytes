// types

export type notifyType = 'commented' | 'replied' | 'liked'

export type entityType = 'post' | 'comment' | 'reply'

// interfaces

export interface authorURL {
  reader: {
    websiteUrl: string
  }
}
export interface postsCountType {
  postsConnection: {
    aggregate: {
      count: number
    }
  }
}
export interface posts {
  posts: [postsType]
}
export interface postsType {
  id: string
  author: {
    bio: string
    id: string
    name: string
    photo: {
      url: string
    }
  }
  createdAt: string
  slug: string
  title: string
  summary: string
  featuredImage: {
    url: string
  }
  categories: [
    {
      name: string
      slug: string
    }
  ]
  readTime: number
}

export interface postDetailsType {
  post: postType
}

export interface postType {
  id: string
  author: {
    bio: string
    id: string
    name: string
    photo: {
      url: string
    }
  }
  createdAt: string
  slug: string
  title: string
  summary: string
  featuredImage: {
    url: string
  }
  categories: [
    {
      name: string
      slug: string
    }
  ]
  content: string
}

export interface recentPostsType {
  posts: [
    {
      title: string
      createdAt: string
      slug: string
      featuredImage: {
        url: string
      }
    }
  ]
}

export interface categoriesType {
  categories: [
    {
      name: string
      slug: string
      shortName: string
    }
  ]
}

export interface loginType {
  reader: {
    id: string
    name: string
    email: string
    password: string
    photo: {
      id: string
      url: string
    }
    isAuthor: boolean
  }
}

export interface userAddedType {
  reader: {
    id: string
    name: string
    email: string
  }
}

export interface readerIdReturnType {
  reader: {
    id: string | null
  }
}
export interface deletedReaderIdReturnType {
  deleteReader: {
    id: string | null
  }
}

export interface profileAvatarsType {
  assets: [
    {
      id: string
      filename: string
      url: string
    }
  ]
}

export interface avatarType {
  asset: {
    url: string
  }
}

export interface updateReaderType {
  updateReader: {
    id: string
  }
  publishReader: {
    id: string
  }
}

export interface postLikesCountType {
  postLikesConnection: {
    aggregate: {
      count: number
    }
  }
}

export interface postAddLikeType {
  createPostLike: {
    id: string
  }
}

export interface postAddLikePublishType {
  publishPostLike: {
    id: string
  }
}

export interface checkPostLikeType {
  postLike: {
    id: string
  }
}

export interface postDeleteLikeType {
  deletePostLike: {
    id: string
  }
}

export interface postCommentsCountType {
  commentsConnection: {
    aggregate: {
      count: number
    }
  }
}

export interface postAddCommentType {
  createComment: {
    id: string
  }
}

export interface postAddCommentPublishType {
  publishComment: {
    id: string
  }
}
export interface getPostCommentType {
  id: string
  reader: {
    id: string
    name: string
    email: string
    photo: {
      url: string
    }
    isAuthor: boolean
  }
  comment: string
  createdAt: string
  updatedAt: string
}
export interface getPostCommentsType {
  comments: [getPostCommentType]
}

export interface postUpdateCommentType {
  updateComment: {
    id: string
  }
}

export interface postDeleteCommentType {
  deleteComment: {
    id: string
  }
}

export interface postDeleteCommentRepliesType {
  deleteManyComments: {
    count: number
  }
}

export interface sendNotificationType {
  createNotification: {
    id: string
  }
}

export interface publishSendNotificationType {
  publishNotification: {
    id: string
  }
}

export interface deleteNotificationType {
  deleteNotification: {
    id: string
  }
}

export interface DeleteAllNotificationsType {
  deleteManyNotificationsConnection: {
    edges: [
      node?: {
        id: string
      }
    ]
  }
}

export interface readNotificationType {
  updateNotification: {
    id: string
  }
  publishNotification: {
    id: string
  }
}

export interface readAllNotificationsType {
  updateManyNotificationsConnection: {
    edges: [
      node?: {
        id: string
      }
    ]
  }
  publishManyNotificationsConnection: {
    edges: [
      node?: {
        id: string
      }
    ]
  }
}
