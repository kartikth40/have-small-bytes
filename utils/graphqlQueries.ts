import { gql } from 'graphql-request'

export const authorUrlQuery = gql`
  query GetauthorUrl($authorId: ID!) {
    reader(where: { id: $authorId }) {
      websiteUrl
    }
  }
`

export const getPostsCountQuery = gql`
  query GetPostsCount {
    postsConnection {
      aggregate {
        count
      }
    }
  }
`

export const PostsQuery = gql`
  query GetPosts($skip: Int!) {
    posts(orderBy: createdAt_DESC, first: 3, skip: $skip) {
      id
      author {
        bio
        id
        name
        photo {
          url
        }
      }
      createdAt
      slug
      title
      summary
      featuredImage {
        url
      }
      categories {
        name
        slug
      }
      readTime
    }
  }
`

export const FeaturedPostsQuery = gql`
  query GetPosts {
    posts(orderBy: createdAt_DESC, first: 5, where: { featuredPost: true }) {
      id
      author {
        bio
        id
        name
        photo {
          url
        }
      }
      createdAt
      slug
      title
      summary
      featuredImage {
        url
      }
      categories {
        name
        slug
      }
    }
  }
`

export const FeaturedCategoryPostsQuery = gql`
  query GetPosts($category: String!) {
    posts(
      orderBy: createdAt_DESC
      where: {
        featuredPost: true
        first: 5
        categories_some: { slug: $category }
      }
    ) {
      id
      author {
        bio
        id
        name
        photo {
          url
        }
      }
      createdAt
      slug
      title
      summary
      featuredImage {
        url
      }
    }
  }
`

export const getCategoryPostsCountQuery = gql`
  query GetCategoryPostsCount($category: String!) {
    postsConnection(where: { categories_some: { slug: $category } }) {
      aggregate {
        count
      }
    }
  }
`

export const CategoryPostsQuery = gql`
  query GetPosts($category: String!, $skip: Int!) {
    posts(
      where: { categories_some: { slug: $category } }
      orderBy: createdAt_DESC
      first: 3
      skip: $skip
    ) {
      id
      author {
        bio
        id
        name
        photo {
          url
        }
      }
      createdAt
      slug
      title
      summary
      featuredImage {
        url
      }
      categories {
        name
        slug
      }
      readTime
    }
  }
`

export const PostDetailsQuery = gql`
  query GetPostDetails($slug: String!) {
    post(where: { slug: $slug }) {
      id
      author {
        bio
        id
        name
        photo {
          url
        }
      }
      createdAt
      slug
      title
      summary
      featuredImage {
        url
      }
      categories {
        name
        slug
      }
      content
    }
  }
`

export const RecentPostsQuery = gql`
query GetPostDetails() {
  posts(orderBy: createdAt_DESC, first: 3){
    title
    featuredImage{
      url
    }
    createdAt
    slug
  }
}
`

export const SimilarPostsQuery = gql`
  query GetPostDetails($slug: String!, $categories: [String!]) {
    posts(
      where: {
        slug_not: $slug
        AND: { categories_some: { slug_in: $categories } }
      }
      orderBy: createdAt_DESC
      first: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
`

export const CategoriesQuery = gql`
query GetCategories() {
  categories {
    name
    slug
    shortName
  }
}
`

export const loginQuery = gql`
  query Login($email: String!) {
    reader(where: { email: $email }) {
      id
      name
      email
      password
      photo {
        id
        url
      }
      isAuthor
    }
  }
`

export const newUserQuery = gql`
  mutation NewUser(
    $name: String!
    $email: String!
    $password: String!
    $photoId: ID!
  ) {
    createReader(
      data: {
        name: $name
        email: $email
        password: $password
        photo: { connect: { id: $photoId } }
      }
    ) {
      id
      name
      email
    }
    publishReader(where: { email: $email }) {
      id
      name
      email
    }
  }
`

export const checkEmailQuery = gql`
  query CheckEmail($email: String!) {
    reader(where: { email: $email }) {
      id
    }
  }
`
export const updateUserQuery = gql`
  mutation UpdateUser($userId: ID!, $name: String!, $photoId: ID!) {
    updateReader(
      data: { photo: { connect: { id: $photoId } }, name: $name }
      where: { id: $userId }
    ) {
      id
    }
    publishReader(where: { id: $userId }) {
      id
    }
  }
`

export const getAllProfileAvatarQuery = gql`
    query GetProfileAvatar(){
      assets(orderBy: fileName_ASC, where: {fileName_contains: "avatar"}, first: 12) {
        id
        fileName
        url
      }
    }
`

export const getAvatarByIdQuery = gql`
  query GetAvatarById($id: ID!) {
    asset(where: { id: $id }) {
      url
    }
  }
`

export const deleteReaderQuery = gql`
  mutation deleteReader($userId: ID!) {
    deleteReader(where: { id: $userId }) {
      id
    }
  }
`

export const resetPasswordQuery = gql`
  mutation ResetPassword($userId: ID!, $password: String!) {
    updateReader(data: { password: $password }, where: { id: $userId }) {
      id
    }
    publishReader(where: { id: $userId }) {
      id
    }
  }
`

export const getPostLikesQuery = gql`
  query GetPostLikes($postId: ID!) {
    postLikesConnection(where: { post: { id: $postId } }) {
      aggregate {
        count
      }
    }
  }
`

export const addPostLikeQuery = gql`
  mutation AddLike($postId: ID!, $readerId: ID!, $postPlusReaderId: String!) {
    createPostLike(
      data: {
        post: { connect: { id: $postId } }
        reader: { connect: { id: $readerId } }
        postPlusReaderId: $postPlusReaderId
      }
    ) {
      id
    }
  }
`

export const addPostLikePublishQuery = gql`
  mutation AddLikePublish($likeId: ID!) {
    publishPostLike(where: { id: $likeId }) {
      id
    }
  }
`

export const checkIfPostLikeQuery = gql`
  query CheckPostLike($postPlusReaderId: String!) {
    postLike(where: { postPlusReaderId: $postPlusReaderId }) {
      postPlusReaderId
      id
    }
  }
`

export const deletePostLikeQuery = gql`
  mutation DeletePostLike($postPlusReaderId: String!) {
    deletePostLike(where: { postPlusReaderId: $postPlusReaderId }) {
      id
    }
  }
`

export const getPostCommentsCountQuery = gql`
  query GetPostCommentsCount($postId: ID!) {
    commentsConnection(
      where: { post: { id: $postId }, replyToCommentId: null }
    ) {
      aggregate {
        count
      }
    }
  }
`

export const getPostCommentsRepliesCountQuery = gql`
  query GetPostCommentsCount($commentId: ID!) {
    commentsConnection(where: { replyToCommentId: { id: $commentId } }) {
      aggregate {
        count
      }
    }
  }
`

export const getPostCommentsQuery = gql`
  query GetPostComments($postId: ID!) {
    comments(
      where: { post: { id: $postId }, replyToCommentId: null }
      orderBy: createdAt_DESC
    ) {
      id
      reader {
        id
        name
        email
        photo {
          url
        }
        isAuthor
      }
      comment
      createdAt
      updatedAt
    }
  }
`
export const getPostCommentsRepliesQuery = gql`
  query GetPostCommentsReply($commentId: ID!) {
    comments(
      where: { replyToCommentId: { id: $commentId } }
      orderBy: createdAt_ASC
    ) {
      id
      reader {
        id
        name
        email
        photo {
          url
        }
        isAuthor
      }
      comment
      createdAt
      updatedAt
    }
  }
`

export const addCommentDraftQuery = gql`
  mutation AddComment($comment: String!, $postId: ID!, $readerId: ID!) {
    createComment(
      data: {
        comment: $comment
        post: { connect: { id: $postId } }
        reader: { connect: { id: $readerId } }
      }
    ) {
      id
    }
  }
`

export const addCommentPublisheQuery = gql`
  mutation AddCommentPublish($commentId: ID!) {
    publishComment(where: { id: $commentId }) {
      id
    }
  }
`

export const addCommentReplyDraftQuery = gql`
  mutation AddCommentReply(
    $comment: String!
    $postId: ID!
    $readerId: ID!
    $commentId: ID!
  ) {
    createComment(
      data: {
        comment: $comment
        post: { connect: { id: $postId } }
        reader: { connect: { id: $readerId } }
        replyToCommentId: { connect: { id: $commentId } }
      }
    ) {
      id
    }
  }
`

export const addCommentReplyPublisheQuery = gql`
  mutation AddCommentReplyPublish($newCommentId: ID!) {
    publishComment(where: { id: $newCommentId }) {
      id
    }
  }
`

export const updateCommentQuery = gql`
  mutation UpdateComment($commentId: ID!, $comment: String!) {
    updateComment(data: { comment: $comment }, where: { id: $commentId }) {
      id
    }
  }
`

export const deletePostCommentQuery = gql`
  mutation DeletePostComment($commentId: ID!) {
    deleteComment(where: { id: $commentId }) {
      id
    }
  }
`

export const deletePostCommentRepliesQuery = gql`
  mutation DeletePostComment($commentId: ID!) {
    deleteManyComments(where: { replyToCommentId: { id: $commentId } }) {
      count
    }
  }
`

export const getUnreadNotificationsCountQuery = gql`
  query GetNotificationsCount($notifierId: ID!) {
    notificationsConnection(
      where: { notifier: { id: $notifierId }, isRead: false }
    ) {
      aggregate {
        count
      }
    }
  }
`

export const getNotificationsQuery = gql`
  query GetNotifications($notifierId: ID!) {
    notifications(
      orderBy: createdAt_DESC
      where: { notifier: { id: $notifierId } }
    ) {
      id
      post {
        id
        slug
        title
      }
      isRead
      notifyType
      actor {
        id
        name
      }
      createdAt
    }
  }
`

export const sendNotificationQuery = gql`
  mutation SendNotification(
    $notifyType: NotificationType!
    $actorId: ID!
    $notifierId: ID!
    $postId: ID!
    $commentId: ID!
  ) {
    createNotification(
      data: {
        isRead: false
        notifyType: $notifyType
        actor: { connect: { id: $actorId } }
        comment: { connect: { id: $commentId } }
        notifier: { connect: { id: $notifierId } }
        post: { connect: { id: $postId } }
      }
    ) {
      id
    }
  }
`

export const sendLikeNotificationQuery = gql`
  mutation SendNotification(
    $notifyType: NotificationType!
    $actorId: ID!
    $notifierId: ID!
    $postId: ID!
  ) {
    createNotification(
      data: {
        isRead: false
        notifyType: $notifyType
        actor: { connect: { id: $actorId } }
        notifier: { connect: { id: $notifierId } }
        post: { connect: { id: $postId } }
      }
    ) {
      id
    }
  }
`

export const publishSendNotificationQuery = gql`
  mutation PublishNotification($id: ID!) {
    publishNotification(where: { id: $id }) {
      id
    }
  }
`

export const deleteNotificationQuery = gql`
  mutation DeleteNotification($id: ID!) {
    deleteNotification(where: { id: $id }) {
      id
    }
  }
`

export const getLikeNotificationToDeleteQuery = gql`
  query GetLikeNotification($actorId: ID!, $notifierId: ID!, $postId: ID!) {
    notificationsConnection(
      first: 1
      where: {
        notifyType: liked
        actor: { id: $actorId }
        notifier: { id: $notifierId }
        post: { id: $postId }
      }
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`

export const deleteCommentNotificationQuery = gql`
  query GetCommentNotification($commentId: ID!) {
    comment: deleteManyNotificationsConnection(
      first: 1
      where: { comment: { id: $commentId } }
    ) {
      edges {
        node {
          id
        }
      }
    }

    replies: deleteManyNotificationsConnection(
      where: { comment: { replyToCommentId: { id: $commentId } } }
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`

export const deleteReplyNotificationQuery = gql`
  query DeleteReplyNotification(
    $replyId: ID!
  ) {
    replies: deleteManyNotificationsConnection(
      first: 1
      where: { comment: { replyToCommentId: { id: $replyId } } }
    ) {
      edges {
        node {
          id
        }
      }
    }
`

export const deleteAllNotificationsQuery = gql`
  mutation DeleteAllNotifications($notifierId: ID!) {
    deleteManyNotificationsConnection(
      where: { notifier: { id: $notifierId } }
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`

export const deleteAllOlderNotificationsQuery = gql`
  mutation DeleteAllOlderNotifications($notifierId: ID!, $date: DateTime!) {
    deleteManyNotificationsConnection(
      where: { notifier: { id: $notifierId }, createdAt_lt: $date }
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`

export const readNotificationQuery = gql`
  mutation ReadNotification($id: ID!) {
    updateNotification(where: { id: $id }, data: { isRead: true }) {
      id
    }
    publishNotification(where: { id: $id }) {
      id
    }
  }
`

export const readAllNotificationsQuery = gql`
  mutation ReadAllNotifications($notifierId: ID!) {
    updateManyNotificationsConnection(
      where: { notifier: { id: $notifierId } }
      data: { isRead: true }
    ) {
      edges {
        node {
          id
        }
      }
    }
    publishManyNotificationsConnection(
      where: { notifier: { id: $notifierId } }
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`
